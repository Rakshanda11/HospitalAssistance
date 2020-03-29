import firebase from "./firebase";
import React, { Component } from "react";

class TestApp extends Component {
  databaseRef = firebase.firestore();

  constructor(props) {
    super(props);
    this.state = {
      patient: "HELLO",
      form: null,
      list: [],
      email: ""
    };
    this.databaseRef.collection("users").onSnapshot((snapshot) => {
      var tempList = [];
        snapshot.forEach(doc => {
          tempList.push(doc.data());
        });
        this.setState({
          list: tempList
        
        });
    })
  }

  addPatient = event => {
    event.preventDefault();
    this.databaseRef.collection("users").add({
      email: this.state.email
    })
  };

  getPatientDetails = async () => {
    this.databaseRef
      .collection("users")
      .get()
      .then(snapshot => {
        var tempList = [];
        snapshot.forEach(doc => {
          tempList.push(doc.data());
        });
        this.setState({
          list: tempList
        });
      });
  };

  render() {
    return (
      <>
        <div>
          <button onClick={this.getPatientDetails}>Get Patient Details</button>
        </div>
        <br />
        <div>
          <ul>
            {this.state.list
              ? this.state.list.map(record => {
                  return <li key={record.email}>{record.email}</li>;
                })
              : null}
            {/* {this.state.list.length} */}
          </ul>
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              this.setState({
                form: (
                  <form onSubmit={this.addPatient}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={this.name}
                      onChange={(event) => {
                        this.setState({
                          email:  event.target.value
                        })
                      }}
                    />
                    <button type="submit">Submit</button>
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
