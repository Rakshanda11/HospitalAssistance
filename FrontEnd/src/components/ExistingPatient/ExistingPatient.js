import React from 'react';
import './ExistingPatient.css';

const initialstate = {
  nameerror: "",
  ageerror: "",
  moberror: "",
  hieghterror: "",
  weighterror: "",
  adhariderror: "",
  addresserror: ""

}


class Patiententry extends React.Component {
  constructor(props) {
    super(props);
    this.patient = {
      name: null,
      mob: null,
      adharid: null,

    };
  }


  state = initialstate;

  validate = () => {
    let nameerror = "";
    let moberror = "";
    let adhariderror = "";

    if (!this.patient.name) {
      nameerror = "Name can not be blank";
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

    if (!this.patient.adharid) {
      adhariderror = "AadharID can not be empty";
    }

    if (isNaN(this.patient.adharid)) {
      adhariderror = "Only digits accepted";
    }

    if (nameerror || adhariderror || moberror) {
      this.setState({ nameerror, moberror, adhariderror });
      return false;
    }

    return true;
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    const isvalid = this.validate();
    if (isvalid) {
      this.props.updateFunction(this.patient);
      this.setState(initialstate);
    }
  }


  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.patient[nam] = val;
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
          <input className="patientInput" id="name" name="name" placeholder="Name" onChange={this.myChangeHandler} />
          {this.state.nameerror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.nameerror}</div>) : null}
          <br />

          <input className="patientInput" id="mob" name="mob" placeholder="Mobile No." onChange={this.myChangeHandler} />
          {this.state.moberror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.moberror}</div>) : null}
          <br />

          <input className="patientInput" id="adharid" name="adharid" placeholder="Adhaar ID" onChange={this.myChangeHandler} />
          {this.state.adhariderror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.adhariderror}</div>) : null}
          <br />

          {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item >Action</Dropdown.Item>
            <Dropdown.Item >Another action</Dropdown.Item>
            <Dropdown.Item >Something else</Dropdown.Item>
          </DropdownButton> */}
          <button className="buttonStyle">
            Search
          </button>
          <br />
        </form>
      </div>
    );
  }

}


export default Patiententry;