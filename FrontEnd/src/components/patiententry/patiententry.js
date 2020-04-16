import React from 'react';
import './patiententry.css';
// import Patientlist from '../patientlist/patientlist';

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
      age: null,
      mob: null,
      hieght: null,
      weight: null,
      adharid: null,
      address: null,
      doctorselected:null

    };
  }


  state = initialstate;

  validate = () => {
    let nameerror = "";
    let ageerror = "";
    let moberror = "";
    let hieghterror = "";
    let weighterror = "";
    let adhariderror = "";
    let addresserror = "";

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

    if (!this.patient.hieght) {
      hieghterror = "Height can not be empty";
    }
    if (isNaN(this.patient.hieght)) {
      hieghterror = "Only digits accepted";
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
    if (!this.patient.adharid) {
      adhariderror = "AadharID can not be empty";
    }
    if (isNaN(this.patient.adharid)) {
      adhariderror = "Only digits accepted";
    }

    if (nameerror || ageerror || hieghterror || weighterror || adhariderror || addresserror || moberror) {
      this.setState({ nameerror, ageerror, moberror, hieghterror, weighterror, adhariderror, addresserror });
      return false;
    }

    return true;
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    // let nam = event.target.name;
    const isvalid = this.validate();
    if (isvalid) {
      this.props.updateFunction(this.patient);
      this.setState(initialstate);
      // this.setState(this.patient[nam] = "");
      // this.setState(defaultentry);
      // this.setState({
      //   name : null,
      //   age : null,
      //   mob : null,
      //   hieght : null,
      //   weight : null,
      //   adharid : null,
      //   address : null

      // });
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
          <input className="patientInput" id="hieght" name="hieght" placeholder="Height" onChange={this.myChangeHandler} />
          {this.state.hieghterror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.hieghterror}</div>) : null}
          <br />
          <input className="patientInput" id="weight" name="weight" placeholder="Weight" onChange={this.myChangeHandler} />
          {this.state.weighterror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.weighterror}</div>) : null}
          <br />
          <input className="patientInput" id="adharid" name="adharid" placeholder="Adhaar ID" onChange={this.myChangeHandler} />
          {this.state.adhariderror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.adhariderror}</div>) : null}
          <br />
          <input className="patientInput" id="address" name="address" placeholder="Address" onChange={this.myChangeHandler} />
          {this.state.addresserror ? (<div style={{ fontSize: 12, color: "red" }}>{this.state.addresserror}</div>) : null}
          <br />
          <select className="select" id="doctorselected" name="doctorselected" onChange={this.myChangeHandler} defaultValue="">
          <option value="" disabled>Select</option>
            <option>Dr.Ajit Niras</option>
            <option>Dr.Niras</option>
          </select>
          <br/>
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