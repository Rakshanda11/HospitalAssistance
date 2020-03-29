import firebase from "./firebase";
import React, { Component } from "react";

class TestApp extends Component {
  constructor(props) {
    super(props);
    // Initialize Firebase
    this.state = {
      patient: "HELLO",
      form: null
    };
    var name = "";
  }

  addPatient = (e) => {
    console.log("HELLO");
    e.preventDefault();
  };

  getPatientDetails = () => {};

  render() {
    return (
      <>
        <div>
          <button>Get Patient Details</button>
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              this.setState({
                form: (
                  <form>
                    <input type="text" placeholder="Name" value={this.name} />
                    <button type="submit" onClick={this.addPatient}>
                      Submit
                    </button>
                  </form>
                )
              });
            }}
          >
            Enter new Patient
          </button>
        </div>
        <br />
        <div>{this.state.form}</div>
        <br />
        <div>{this.state.patient}</div>
      </>
    );
  }
}

export default TestApp;
