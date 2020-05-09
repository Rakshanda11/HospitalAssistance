import React from "react";
import "./DoctorDiagnosis.css";
// import SuggestedTextBox from "../Extras/suggestedTest";
import firebase from "../../../firebase";
// import DoctorPageStart from "./StartDoctor";
class Diagnosis extends React.Component {
  today = (new Date()).toDateString();

  databaseRef = firebase.firestore();
  patientDatabaseRef = this.databaseRef
    .collection("Patients")
  labQueueRef = this.databaseRef
    .collection("Everyday-Patients")
    .doc(this.today)
    .collection("Lab");
  investigatedRef = this.databaseRef
    .collection("Everyday-Patients")
    .doc(this.today)
    .collection("Investigated");
  receptionQueueRef = this.databaseRef
    .collection("Everyday-Patients")
    .doc(this.today)
    .collection("Reception")
  unUsualRef = this.databaseRef
    .collection("Unusual Reports")

  state = {
    addNew: true,
    tests: []
  };

  currentPatient = null;

  testName = "";
  diagnosisData = {}

  validate = (lab) => {
    let fields = [
      "bloodPressure",
      "temperature",
      "pulseRate",
      "spo2",
      "complaints",
      "symptoms",
    ]

    if (!lab){  // If request came for submitting to lab, don't check these. Else check these also.
      fields = [...fields, 
        "diagnosis",
        "remarks"]
    }

    let keys = Object.keys(this.diagnosisData)

    if (keys.length === 0){
      this.props.alertFunction("Nothing is filled")
      return true
    }
    
    for (var eachData in fields){
      if (!(keys.includes(fields[eachData]))){
        this.props.alertFunction("Please make sure you have filled all the data")
        return true
      }
    }

    let errorString = "Please enter the following details to proceed:\n\n";
    let isError = false;
    // Check which elements are missing
    keys.forEach((textType, index) => {
      if (!(this.diagnosisData[textType].length)) {
        // errors[textType] = true;
        errorString += " " + textType.toString() + "\n\n"
        isError = true;
      }
    })
    if (isError) {
      this.props.alertFunction(errorString);
      return true;
    }
    // return errors;
  }

  onChangeHandler = (event) => {
    // Which type of text is this  
    var name = event.target.name;
    // The value entered bu the doctor for this text
    var value = event.target.value;
    this.diagnosisData[name] = value;

    // Let the parent know the new updated details of the form
    this.props.diagnosisChangeHandler(this.diagnosisData);
  }

  addTestToList = event => {
    if (event.keyCode === 13) {
      var tempList = this.state.tests;
      tempList.push(event.target.value);
      this.setState({
        tests: tempList,
        addNew: false
      });
    }
  };

  finalSubmitHandler = (event) => {
    event.preventDefault();

    // Check if unfilled diagnosis
    if (this.validate()) {
      return;
    }

    console.log(this.diagnosisData);

    // Create a new patient object 
    // with structure as per database

    var finalPatientObject = {
      name: this.currentPatient.name,
      mob: this.currentPatient.mob,
      patientId: this.currentPatient.patientId,
      adhaarid: this.currentPatient.adhaarid,
      height: this.currentPatient.height,
      weight: this.currentPatient.weight,
      age: this.currentPatient.age,
      address: this.currentPatient.address,
      doctorselected: this.currentPatient.doctorselected,
    }
    this.diagnosisData["prescriptions"] = this.props.prescriptionData
    // Create a new document in the patients collection
    // with doc ID as adhaar id
    this.patientDatabaseRef
      .doc(finalPatientObject.adhaarid)
      .set(finalPatientObject)
      .then(() => {
        // In the current firebase document
        // Go to the collection named "Visits"
        // And a new document with doc ID as today date
        return this.patientDatabaseRef
          .doc(finalPatientObject.adhaarid)
          .collection("Visits")
          .doc(this.today)
          .set(this.diagnosisData)
      })
      .then(() => {
        if (this.currentPatient.type === "New") {
          return this.receptionQueueRef
            .where("adhaarid", "==", finalPatientObject.adhaarid)
            .get()
            .then((patientDocs) => {
              patientDocs.forEach((eachDoc) => {
                eachDoc.ref.delete();
              })
            })
        }
        // Then delete this patient from investigated queue
        return this.investigatedRef
          .where("adhaarid", "==", finalPatientObject.adhaarid)
          .get()
          .then((patientDocs) => {
            patientDocs.forEach((eachDoc) => {
              eachDoc.ref.delete();
            })
          })
      })
      .then(() => {
        this.props.alertFunction("Diagnosis Completed")
        this.props.onSubmitFun();

      })
      .catch(error => {
        this.props.alertFunction(error)
      })



  }

  render() {
    this.currentPatient = this.props.currentPatient;
    this.diagnosisData = this.props.diagnosisData;
    let listOfTests = (
      <ol className="ordered-list">
        {this.state.tests.map(individualTest => {
          return (
            <li
              key={individualTest}
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
          style={{ color: "white" }}
          className="new-item-text-button"
          onClick={() => {
            if (this.testName === "") return;
            var tempList = this.state.tests;
            tempList.push(this.testName);
            this.setState({
              tests: tempList,
              addNew: false
            });
            this.diagnosisData["tests"] = this.state.tests;

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
        <h3 className="category-label-top" style={{ textAlign: "center" }}>New Diagnosis</h3>

        <h5 style={{ textAlign: "center" }}>Date: {(new Date()).toDateString()}</h5>

        <hr />

        <form
          className="diagnosis-form"
          ref="form"
          noValidate
          onSubmit={event => {
            event.preventDefault();
            this.validate()
          }}
        >
          {/* Basic Diagnosis */}
          <div className="wrapper">
            <div className="control-group">

              <div className="basic-item">
                <label htmlFor="inputKey">Blood Pressure: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder="mmHg"
                  name="bloodPressure"
                  defaultValue={this.diagnosisData["bloodPressure"]}
                  onChange={this.onChangeHandler}
                  required
                />
              </div>

              <div className="basic-item">
                <label htmlFor="inputValue">Temperature: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder={"\u2109"}
                  name="temperature"
                  defaultValue={this.diagnosisData["temperature"]}
                  onChange={this.onChangeHandler}
                  required
                />
              </div>

              <div className="basic-item">
                <label htmlFor="inputKey">Pulse Rate:</label>
                <input
                  type="number"
                  className="input-small"
                  placeholder="per min"
                  name="pulseRate"
                  defaultValue={this.diagnosisData["pulseRate"]}
                  onChange={this.onChangeHandler}
                  required
                />
              </div>

              <div className="basic-item">
                <label htmlFor="inputValue">SPO2: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder={"%"}
                  name="spo2"
                  defaultValue={this.diagnosisData["spo2"]}
                  onChange={this.onChangeHandler}
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
              defaultValue={this.diagnosisData["complaints"]}
              rows="4"
              onChange={this.onChangeHandler}
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
              defaultValue={this.diagnosisData["symptoms"]}
              rows="4"
              onChange={this.onChangeHandler}
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

                    onChange={this.onChangeHandler}
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
                      if (this.validate(true)) {
                        return;
                      }

                      this.currentPatient.diagnosisData = this.diagnosisData;
                      this.currentPatient.diagnosisData.tests = this.state.tests;
                      this.currentPatient["Doctor"] = this.props.doctorName;

                      // Add this patient to the firebase lab queue

                      this.labQueueRef
                        .doc(this.currentPatient.adhaarid)
                        .set(this.currentPatient)
                        .then(() => {

                          // Remove this patient from new patients
                          this.receptionQueueRef
                            .where("adhaarid", "==", this.currentPatient.adhaarid)
                            .get()
                            .then((patientDocs) => {
                              patientDocs.forEach((eachDoc) => {
                                eachDoc.ref.delete();
                              })
                              this.props.alertFunction("Patient Details sent to lab.", "success")
                              this.props.onSubmitFun();
                            })
                            .catch((err) => {
                              this.props.alertFunction(err)
                            })
                        })


                    }}
                  >Submit to Lab</button></>
              )}
            </div>
          </div> :
            // <h4 className="category-label">Tests Are DONE!</h4>
            <div className="tests-list">
              <h4 className="category-label">
                List of Tests performed:
              </h4>
              <ol className="ordered-list">
                {this.currentPatient.diagnosisData.completedTests.map(individualTest => {
                  return (
                    <li
                      key={individualTest.test}
                    >
                      <div className="test-item">
                        <span>{individualTest.test}</span>
                        <div className="spacer"></div>
                        <button
                          style={{ marginRight: "1rem" }}
                          onClick={() => {
                            window.open(individualTest.url, "_blank")
                          }}>View Report</button>
                        <button
                          type="button"
                          onClick={() => {
                            this.unUsualRef.add({
                              testName: individualTest.test,
                              reportURL: individualTest.url
                            })
                              .then(() => {
                                this.props.alertFunction("Report submitted successfully")
                              })
                              .catch((error) => { this.props.alertFunction(error) })
                          }}>Unusual Report?</button>
                      </div>
                      {/* <span>{individualTest.test}</span> */}
                    </li>
                  );
                })}
              </ol>
            </div>}


          <hr />

          {this.state.tests.length ? null :
            <>
              <h4 className="category-label">Diagnosis</h4>
              <div className="paper">
                <textarea
                  className="text-area"
                  placeholder="From the results and symptoms"
                  id="text"
                  name="Diagnosis"
                  defaultValue={this.diagnosisData["Diagnosis"]}
                  rows="4"
                  onChange={this.onChangeHandler}
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
                  name="Remarks"
                  defaultValue={this.diagnosisData["Remarks"]}
                  rows="4"
                  onChange={this.onChangeHandler}
                ></textarea>
                <br />
              </div>

              <hr />

              <br />

              <div className="box-1">
                <button
                  className="btn btn-one submit-button"
                  type="submit"
                  onClick={this.finalSubmitHandler}
                >
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
