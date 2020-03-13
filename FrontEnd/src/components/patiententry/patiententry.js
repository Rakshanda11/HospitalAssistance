import React from 'react';
import './patiententry.css';
// import Patientlist from '../patientlist/patientlist';


class Patiententry extends React.Component {
  constructor(props) {
    super(props);
    this.patient = {
        name: null,
        age: null,
        hieght: null,
        weight: null,
        adharid: null,
        address: null
    
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    // this.props.handleData(this.state)
    // alert("Details Are " +
    //   this.patient.name + "\n" +
    //   this.state.age + "\n" +
    //   this.state.hieght + "\n" +
    //   this.state.weight + "\n" +
    //   this.state.adharid + "\n" +
    //   this.state.address
    // );
    this.props.updateFunction(this.patient);

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
        <h3>Patient Entry</h3>
        <form className="entryform" onSubmit={this.mySubmitHandler}>
          <label >
            Patient Details
          </label>
          <br />
          <input className="patientInput" id="name" name="name" placeholder="Name" onChange={this.myChangeHandler} />
          <br />
          <input className="patientInput" id="age" name="age" placeholder="Age" onChange={this.myChangeHandler} />
          <br />
          <input className="patientInput" id="hieght" name="hieght" placeholder="Height" onChange={this.myChangeHandler} />
          <br />
          <input className="patientInput" id="weight" name="weight" placeholder="Weight" onChange={this.myChangeHandler} />
          <br />
          <input className="patientInput" id="adharid" name="adharid" placeholder="Adhaar ID" onChange={this.myChangeHandler} />
          <br />
          <input className="patientInput" id="address" name="address" placeholder="Address" onChange={this.myChangeHandler} />
          <br />
          <button className="buttonStyle">
            Add
          </button>
        </form>
      </div>
    );
  }

}


export default Patiententry;