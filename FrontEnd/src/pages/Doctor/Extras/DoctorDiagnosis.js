import React from "react";
import "./DoctorDiagnosis.css";
// import SuggestedTextBox from "../Extras/suggestedTest";
import firebase from "../../../firebase";

class Diagnosis extends React.Component {
  today = (new Date()).toDateString();

  databaseRef = firebase.firestore();
  labQueueRef = this.databaseRef
    .collection("Everyday-Patients")
    .doc(this.today)
    .collection("Lab");
  receptionQueueRef = this.databaseRef
    .collection("Everyday-Patients")
    .doc(this.today)
    .collection("Reception")

  state = {
    addNew: true,
    tests: []
  };

  currentPatient = null;

  testName = "";
  diagnosisData = {
    bloodPressure: "",
    temperature: "",
    pulseRate: "",
    spo2: "",
    complaints: "",
    symptoms: "",
  }

  validate = () => {
    // let errors = {
    //   bloodPressure: false,
    //   temperature: false,
    //   pulseRate: false,
    //   spo2: false,
    //   complaints: false,
    //   symptoms: false,
    // }

    let errorString = "Please enter the following details to proceed:\n\n";
    let isError = false;
    // Check which elements are missing
    Object.keys(this.diagnosisData).map((textType, index) => {
      if (!(this.diagnosisData[textType].length)) {
        // errors[textType] = true;
        errorString += " " + textType.toString() + "\n\n"
        isError = true;
      }
    })
    if (isError) {
      alert(errorString);
      return true;
    }
    // return errors;
  }

  addTestToList = event => {
    if (event.keyCode === 13) {
      // console.log(event.target.value.length)
      var tempList = this.state.tests;
      tempList.push(event.target.value);
      this.setState({
        tests: tempList,
        addNew: false
      });
    }
  };

  render() {
    this.currentPatient = this.props.currentPatient;

    let listOfTests = (
      <ol className="ordered-list">
        {this.state.tests.map(individualTest => {
          return (
            <li
              key={individualTest}
              onClick={() => {
                console.log(individualTest);
              }}
            >
              <span>{individualTest}</span>
            </li>
          );
        })}
      </ol>
    );

    let newItemText = (
      <div className="new-item-text">
        <input
          type="text"
          placeholder="Name of the Test"
          onChange={event => {
            this.testName = event.target.value;
          }}
        ></input>
        <button
          className="new-item-text-button"
          onClick={() => {
            if (this.testName === "") return;
            var tempList = this.state.tests;
            tempList.push(this.testName);
            this.setState({
              tests: tempList,
              addNew: false
            });

            this.testName = "";
          }}
        >
          Add this test
        </button>
      </div>
    );

    return (
      <>
        <hr />
        <h3>New Diagnosis</h3>

        <h5 style={{ textAlign: "center" }}>Date: {(new Date()).toDateString()}</h5>

        <hr />

        <form
          className="diagnosis-form"
          ref="form"
          noValidate
          onSubmit={event => {
            event.preventDefault();
            console.log("SUBMITTED")
            console.log(this.diagnosisData)
            this.validate()
          }}
        >
          {/* Basic Diagnosis */}
          <div className="wrapper">
            <div className="control-group">
              <div className="controls form-inline basics-row">
                <label htmlFor="inputKey">Blood Pressure: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder="mmHg"
                  onChange={(event) => {
                    this.diagnosisData.bloodPressure = event.target.value;
                  }}
                  required
                />

                {/* <div className="spacer"></div> */}

                <label htmlFor="inputValue">Temperature: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder={"\u2109"}
                  onChange={(event) => {
                    this.diagnosisData.temperature = event.target.value;
                  }}
                  required
                />
              </div>
            </div>

            <hr />

            <div className="control-group">
              <div className="controls form-inline basics-row">
                <label htmlFor="inputKey">Pulse Rate:</label>
                <input
                  type="number"
                  className="input-small"
                  placeholder="per min"
                  onChange={(event) => {
                    this.diagnosisData.pulseRate = event.target.value;
                  }}
                  required
                />
                {/* <div className="spacer"></div> */}

                <label htmlFor="inputValue">SPO2: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder={"%"}
                  onChange={(event) => {
                    this.diagnosisData.spo2 = event.target.value;
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <hr />

          {/* Further Diagnosis Starts */}
          <h4 className="category-label">Complaints by Patient</h4>
          <div className="paper">
            <textarea
              className="text-area"
              placeholder="What are patient's complaints?"
              id="text"
              name="complaints"
              rows="4"
              onChange={(event) => {
                this.diagnosisData.complaints = event.target.value;
              }}
              required
            ></textarea>
            <br />
          </div>

          <hr />

          <h4 className="category-label">Symptoms Found Out</h4>
          <div className="paper">
            <textarea
              className="text-area"
              placeholder="Patient is showing these symptoms:"
              id="text"
              name="symptoms"
              rows="4"
              onChange={(event) => {
                this.diagnosisData.symptoms = event.target.value;
              }}
              required
            ></textarea>
            <br />
          </div>

          <hr />

          {/* LIST OF TESTS */}
          {this.currentPatient.type === "New" ? <div className="tests-list">
            <h4 className="category-label">
              List of Tests that need to be performed:
            </h4>
            {listOfTests}
            {this.state.addNew ? newItemText : null}
            <div className="new-item">
              {this.state.tests.length === 0 ? null : (
                <>
                  <button
                    type="button"
                    className="new-item-button"
                    onClick={() => {
                      this.setState(prevState => ({
                        addNew: !prevState.addNew
                      }));
                    }}
                  >
                    Add?
                </button>
                  <br></br>
                  <button
                    type="button"
                    className="submit-text-button"
                    onClick={() => {

                      // Check if unfilled diagnosis
                      if (this.validate()) {
                        return;
                      }

                      this.currentPatient.diagnosisData = this.diagnosisData;
                      this.currentPatient.diagnosisData.tests = this.state.tests;

                      // Add this patient to the firebase lab queue
                      this.labQueueRef
                        .doc(this.currentPatient.adhaarid)
                        .set(this.currentPatient)
                        .then((any) => {
                          
                          // Remove this patient from new patients
                          this.receptionQueueRef
                            .where("adhaarid", "==", this.currentPatient.adhaarid)
                            .get()
                            .then((patientDocs) => {
                              console.log(patientDocs)
                              patientDocs.forEach((eachDoc) => {
                                eachDoc.ref.delete();
                              })
                            })
                            .catch((err) => {
                              console.log(err)
                            })
                        })


                    }}
                  >Submit to Lab</button></>
              )}
            </div>
          </div> : <h4 className="category-label">Tests Are DONE!</h4>}

          <hr />

          {this.state.tests.length ? null :
            <>
              <h4 className="category-label">Diagnosis</h4>
              <div className="paper">
                <textarea
                  className="text-area"
                  placeholder="From the results and symptoms"
                  id="text"
                  name="complaints"
                  rows="4"
                // onChange={(event)=> {
                //   this.diagnosisData.diasnosis = event.target.value;
                // }}
                ></textarea>
                <br />
              </div>

              <hr />

              <h4 className="category-label">Remarks</h4>
              <div >
                <textarea
                  className="text-area"
                  placeholder="If any"
                  id="text"
                  name="complaints"
                  rows="4"
                // onChange={(event)=> {
                //   this.diagnosisData.remarks = event.target.value;
                // }}
                ></textarea>
                <br />
              </div>

              <hr />

              <br />

              <div className="box-1">
                <button className="btn btn-one submit-button" type="submit">
                  Submit
            </button>
              </div>

              <hr />

              <br />
              <br />


              <hr />
            </>}

        </form>
      </>
    );
  }
}
export default Diagnosis;
