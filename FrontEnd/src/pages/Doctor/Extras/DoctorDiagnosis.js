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
        test: tempList,
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
              test: tempList,
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

        <h5 style={{ textAlign: "center" }}>Date: STATIC 2/Feb/2020</h5>

        <hr />

        <form
          ref="form"
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <div className="wrapper">
            <div className="control-group">
              <div className="controls form-inline basics-row">
                <label htmlFor="inputKey">Blood Pressure: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder="mmHg"
                />

                {/* <div className="spacer"></div> */}

                <label htmlFor="inputValue">Temperature: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder={"\u2109"}
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
                />
                {/* <div className="spacer"></div> */}

                <label htmlFor="inputValue">SPO2: </label>
                <input
                  type="number"
                  className="input-small"
                  placeholder={"%"}
                />
              </div>
            </div>
          </div>

          <hr />

          <h4 className="category-label">Complaints by Patient</h4>

          <div className="paper">
            <textarea
              className="text-area"
              placeholder="What are patient's complaints?"
              id="text"
              name="complaints"
              rows="4"
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
                <button
                  onClick={() => {
                    this.setState(prevState => ({
                      addNew: !prevState.addNew
                    }));
                  }}
                >
                  Add?
                </button>
              )}
            </div>
          </div>

          <hr />

          <br />

          {/* <div className="custom-control custom-radio">
            <p>Do you recommend any tests?</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.setTrue}
            >
              YES
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.setFalse}
            >
              NO
            </button>
            <br />
            <br />
          </div> */}
          <div className="box-1">
            <button className="btn btn-one submit-button" type="submit">
              Submit
            </button>
          </div>

          <hr />
          {/* <h4 className="category-label">Diagnosis</h4>

          <div className="paper">
            <textarea
              className="text-area"
              placeholder="Enter further diagnosis (If Any)"
              id="text"
              name="diagnosis"
              rows="4"
            ></textarea>
            <br />
          </div>

          <hr /> */}

          <br />
          <br />
        </form>

        <hr />
      </>
    );
  }
}
export default Diagnosis;
