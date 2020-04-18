import React from 'react';
import './patiententry.css';
// import Patientlist from '../patientlist/patientlist';
import firebase from '../../firebase';

const initialstate = {
  nameerror: "",
  ageerror: "",
  moberror: "",
  heighterror: "",
  weighterror: "",
  aadhariderror: "",
  addresserror: ""

}


class Patiententry extends React.Component {
  databaseRef = firebase.firestore();

  patientRef = this.databaseRef.collection("Patients");
  daywiseRef = this.databaseRef.collection("Everyday-Patients");

  constructor(props) {
    super(props);
    this.patient = {
      name: null,
      age: null,
      mob: null,
      height: null,
      weight: null,
      adhaarid: null,
      address: null,
      doctorselected: null
    };
  }


  state = initialstate;

  validate = () => {
    let nameerror = null;
    let ageerror = null;
    let moberror = null;
    let heighterror = null;
    let weighterror = null;
    let aadhariderror = null;
    let addresserror = null;

    if (!this.patient.name) {
      nameerror = "Name can not be blank";
    }
    if (!this.patient.age) {
      ageerror = "Age cannot be blank";
    }
    if (isNaN(this.patient.age)) {
      ageerror = "Only digits accepted";
    }
    if (!this.patient.mob) {
      moberror = "Mobile No. cannot be blank";
    }
    if (isNaN(this.patient.mob)) {
      moberror = "Only digits accepted";
    }
    if (this.patient.mob != null && (this.patient.mob.length > 10 || this.patient.mob.length < 10)) {
      moberror = "Mobile number must be of 10 digits";
    }

    if (!this.patient.height) {
      heighterror = "Height can not be empty";
    }
    if (isNaN(this.patient.height)) {
      heighterror = "Only digits accepted";
    }
    if (!this.patient.weight) {
      weighterror = "Weight can not be empty";
    }
    if (isNaN(this.patient.weight)) {
      weighterror = "Only digits accepted";
    }
    if (!this.patient.address) {
      addresserror = "Adress can not be empty";
    }
    if (!this.patient.adhaarid) {
      aadhariderror = "AadharID can not be empty";
    }
    if (isNaN(this.patient.adhaarid)) {
      aadhariderror = "Only digits accepted";
    }

    console.log("Errors:")
    console.log({ nameerror, ageerror, moberror, heighterror, weighterror, aadhariderror, addresserror });

    if (nameerror || ageerror || heighterror || weighterror || aadhariderror || addresserror || moberror) {
      this.setState({ nameerror, ageerror, moberror, heighterror, weighterror, aadhariderror, addresserror });
      return false;
    }

    return true;
  };

  getToday = () => {
    var today = new Date();
    return today.toDateString();
  }

  mySubmitHandler = (event) => {
    var today = this.getToday();
    event.preventDefault();
    // let nam = event.target.name;
    const isvalid = this.validate();
    console.log(isvalid)
    if (isvalid) {
      this.setState(initialstate);
      // this.props.updateFunction(this.patient);

      // Check if the entered adhaar id is already used.
      this.patientRef.where("adhaarid", "==", this.patient.adhaarid)
        .get()  // Async req
        .then((patientsSnapshot) => {
          if (patientsSnapshot.docs.length) {
            alert("Patient with this adhaar ID already exists in the database.")
          }
          else {
            // Get total patients
            this.patientRef
              .get()
              .then((allPatientSnap) => {
                var totalPatients = allPatientSnap.docs.length;

                // Assign patient id
                this.patient["PatientId"] = totalPatients + 1;

                // Add to main patient database
                return this.patientRef.add(this.patient);
              })
              .then(() => {

                // Add to daywise reception database
                this.daywiseRef
                  .doc(today)
                  .collection("Reception")
                  .doc(this.patient.adhaarid)
                  .set(this.patient)

                // Add the date field
                this.patientRef
                  .doc(today)
                  .set({
                    "Date": today
                  })

                this.props.updateFunction(this.patient);
                alert("Patient Added to Database successfully!")
              })
              .catch((err) => { console.log(err) })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }


  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    // this.setState({ [nam]: val });
    this.patient[nam] = val;
  }



  render() {
    return (

      <div className="entry">
        <h3 className="patiententry">Patient Entry</h3>
        <form className="entryform" onSubmit={this.mySubmitHandler}>
          <label >
            Patient Details
          </label>
          <br />
          <input className="patientInput" id="name" name="name" placeholder="Name" onChange={this.myChangeHandler} />
          {this.state.nameerror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.nameerror}</div>) : null}
          <br />
          <input className="patientInput" id="age" name="age" placeholder="Age" onChange={this.myChangeHandler} />
          {this.state.ageerror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.ageerror}</div>) : null}
          <br />
          <input className="patientInput" id="mob" name="mob" placeholder="Mobile No." onChange={this.myChangeHandler} />
          {this.state.moberror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.moberror}</div>) : null}
          <br />
          <input className="patientInput" id="height" name="height" placeholder="Height" onChange={this.myChangeHandler} />
          {this.state.heighterror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.heighterror}</div>) : null}
          <br />
          <input className="patientInput" id="weight" name="weight" placeholder="Weight" onChange={this.myChangeHandler} />
          {this.state.weighterror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.weighterror}</div>) : null}
          <br />
          <input className="patientInput" id="aadharid" name="adhaarid" placeholder="Aadhaar ID" onChange={this.myChangeHandler} />
          {this.state.adhariderror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.adhariderror}</div>) : null}
          <br />
          <input className="patientInput" id="address" name="address" placeholder="Address" onChange={this.myChangeHandler} />
          {this.state.addresserror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.addresserror}</div>) : null}
          <br />
          <select className="select" id="doctorselected" name="doctorselected" onChange={this.myChangeHandler} defaultValue="">
          <option value="" disabled>Select</option>
            <option>Doctor A</option>
            <option>Doctor B</option>
          </select>
          <br />
          <button className="buttonStyle">
            Add
          </button>
          <br />
        </form>
      </div>
    );
  }

}


export default Patiententry;