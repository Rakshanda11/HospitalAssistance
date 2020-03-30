import React from "react";
import "./DoctorDiagnosis.css";
// import SuggestedTextBox from "../Extras/suggestedTest";

class Diagnosis extends React.Component {
  state = {
    addNew: false,
    tests: ["Test1", "Test2"]
  };
  name = "";

  addTestToList = event => {
    if (event.keyCode == 13) {
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
        <form
          onSubmit={event => {
            event.preventDefault();
            var tempList = this.state.tests;
            tempList.push(this.name);
            this.setState({
              test: tempList,
              addNew: false
            });
          }}
        >
          <input type="text" onChange={(event) => {
            this.name = event.target.value;
          }}></input>
          <button type="submit" className="new-item-text-button">
            Add this test
          </button>
        </form>
      </div>
    );

    return (
      <>
        <h3>New Diagnosis</h3>

        <form
          ref="form"
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <div className="control-group">
            <div className="controls form-inline basics-row">
              <label htmlFor="inputKey">Blood Pressure: </label>
              <input type="text" className="input-small" placeholder="mmHg" />

              <div className="spacer"></div>

              <label htmlFor="inputValue">Temperature: </label>
              <input
                type="password"
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
                type="text"
                className="input-small"
                placeholder="per min"
              />
            </div>
          </div>

          <hr />

          <div className="paper">
            <textarea
              className="text-area"
              placeholder="Enter further diagnosis (If Any)"
              id="text"
              name="text"
              rows="4"
            ></textarea>
            <br />
          </div>

          <hr />

          {/* LIST OF TESTS */}
          <div className="tests-list">
            <h6>Lists of Tests to be performed:</h6>
            {listOfTests}
            {this.state.addNew ? newItemText : null}
            <div className="new-item">
              <button
                onClick={() => {
                  this.setState(prevState => ({
                    addNew: !prevState.addNew
                  }));
                }}
              >
                Add?
              </button>
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

          <br />
          <br />
        </form>

        <hr />
      </>
    );
  }
}
export default Diagnosis;
