import React from 'react';
import './ExistingPatient.css';

import firebase from '../../firebase';

const initialstate = {
  adhaariderror: ""
}


class Patiententry extends React.Component {

  today = (new Date()).toDateString();

  databaseRef = firebase.firestore();
  daywiseRef = this.databaseRef.collection('Everyday-Patients')
  patientRef = this.databaseRef.collection('Patients')

  constructor(props) {
    super(props);
    this.patient = {
      adhaarid: null,
    };
  }


  state = {
    adhaariderror: "",
    doctors: [],
    found: false
  }

  validate = () => {
    let adhaariderror = "";

    if (!this.patient.adhaarid) {
      adhaariderror = "AadharID can not be empty";
    }

    if (isNaN(this.patient.adhaarid)) {
      adhaariderror = "Only digits accepted";
    }

    if (adhaariderror) {
      this.setState({ adhaariderror });
      return false;
    }

    return true;
  };

  mySubmitHandler = () => {
    const isvalid = this.validate();
    if (isvalid) {
      // this.props.updateFunction(this.patient);
      this.setState(initialstate, () => {
        console.log(this.patient)
      });


      // Get total patients
      this.patientRef
        .get()
        .then((allPatientSnap) => {
          var totalPatients = allPatientSnap.docs.length;

          // Assign patient id
          this.patient["patientId"] = totalPatients + 1;

          // Add to main patient database
          return this.patientRef.add(this.patient);
        })
        .then(() => {
          // Add to daywise reception database
          this.daywiseRef
            .doc(this.today)
            .collection("Reception")
            .doc(this.patient.adhaarid)
            .set(this.patient)
            .then(() => {
              // Add the date field
              this.daywiseRef
                .doc(this.today)
                .set({
                  "Date": this.today
                })
            })

          this.props.updateFunction(this.patient);
          alert("Patient Added to Database successfully!")
        })
        .catch((err) => { console.log(err) })

  }
}

componentDidMount() {
  this.setState({
    doctors: Object.keys(this.props.doctors)
  })
}

componentWillReceiveProps(nextProps) {
  if (nextProps.doctors !== this.props.doctors) {
    this.setState({
      doctors: Object.keys(nextProps.doctors)
    })
  }
}

myChangeHandler = (event) => {
  let nam = event.target.name;
  let val = event.target.value;
  this.patient[nam] = val;
}

searchHandler = () => {
  if (!this.patient.adhaarid) {
    alert("Enter Adhaar ID")
    return;
  }
  // Try to get a patient with the given adhaar id
  this.patientRef
    .where("adhaarid", "==", this.patient.adhaarid)
    .get()
    .then((patientsSnap) => {
      patientsSnap.forEach((patient) => {
        this.patient = patient.data()
        this.patient["doctorselected"] = null
      })
      this.setState({
        found: true
      }, () => { })
      console.log(this.patient)

    })
    .catch(error => { console.log(error) })
}

render() {
  return (

    <div className="entry">
      <h3 className="patiententry">Search Patient</h3>
      <form className="entryform" onSubmit={this.mySubmitHandler}>
        <label >
          Patient Details
          </label>
        <br />

        <input className="patientInput" id="adhaarid" name="adhaarid" placeholder="Adhaar ID" onChange={this.myChangeHandler} />
        {this.state.adhaariderror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.adhaariderror}</div>) : null}
        <br />

        <select className="select" id="doctorselected"
          name="doctorselected"
          onChange={this.myChangeHandler} defaultValue="">
          <option value="" disabled>Select</option>
          {this.state.doctors.map(name => <option key={name}>{name}</option>)}
        </select>


        <br />
      </form>
      <button className="buttonStyle" type="button" onClick={this.searchHandler}>
        Search
          </button>
      {this.state.found ? <button className="buttonStyle" type="button" onClick={this.mySubmitHandler}>
        Submit
          </button> : null}
    </div>
  );
}

}


export default Patiententry;