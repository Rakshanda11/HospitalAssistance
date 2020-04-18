import React from "react";
import "./DoctorDiagnosis.css";
// import SuggestedTextBox from "../Extras/suggestedTest";

class Diagnosis extends React.Component {
  state = {
    addNew: true,
    tests: []
  };
  name = "";

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
            this.name = event.target.value;
          }}
        ></input>
        <button
          className="new-item-text-button"
          onClick={() => {
            if (this.name === "") return;
            var tempList = this.state.tests;
            tempList.push(this.name);
            this.setState({
              tests: tempList,
              addNew: false
            });
            this.name = "";
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

    <h5 style={{ textAlign: "center" }}>Date: {(new Date).toDateString()}</h5>

        <hr />

        <form
          className="diagnosis-form"
          ref="form"
          noValidate
          onSubmit={event => {
            event.preventDefault();
            console.log("SUBMITTED")
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
                  required
                />

                {/* <div className="spacer"></div> */}

                <label htmlFor="inputValue">Temperature: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder={"\u2109"}
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
                  required
                />
                {/* <div className="spacer"></div> */}

                <label htmlFor="inputValue">SPO2: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder={"%"}
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
              required
            ></textarea>
            <br />
          </div>

          <hr />

          {/* LIST OF TESTS */}
          <div className="tests-list">
            <h4 className="category-label">
              List of Tests that need to be performed:
            </h4>
            {listOfTests}
            {this.state.addNew ? newItemText : null}
            <div className="new-item">
              {this.state.tests.length === 0 ? null : (
                <>
                  <button className="new-item-button"
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
                    className="submit-text-button"
                    onClick={() => { console.log(this.state.tests) }}
                  >Submit to Lab</button></>
              )}
            </div>
          </div>

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
