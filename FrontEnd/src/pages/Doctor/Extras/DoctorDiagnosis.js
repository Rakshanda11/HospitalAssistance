import React from "react";
import "./DoctorDiagnosis.css";

class Prescription extends React.Component {
  state = {
    medicines: "Enter The Prescription"
  };
  handleMedicine = e => {
    this.setState({ medicines: e.target.value });
  };
  clearInput = e => {
    this.setState({ medicines: "" });
  };
  render() {
    return (
      <form>
        <h3>Current Diagnosis</h3>

        <div class="control-group">
          <div class="controls form-inline basics-row">
            <label for="inputKey">Blood Pressure: </label>
            <input
              type="text"
              class="input-small"
              placeholder="mmHg"
              id="inputKey"
            />

            <div className="spacer"></div>

            <label for="inputValue">Temperature: </label>
            <input
              type="password"
              class="input-small"
              placeholder={"\u2109"}
              id="inputValue"
            />
          </div>
        </div>

        <hr />

        <div class="control-group">
          <div class="controls form-inline basics-row">
            <label for="inputKey">Pulse Rate</label>
            <input
              type="text"
              class="input-small"
              placeholder="per min"
              id="inputKey"
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
        <br/>
        <div class="box-1">
          <div class="btn btn-one">
            <span>HOVER ME</span>
          </div>
        </div>
        <br/>
        <br/>
      </form>
    );
  }
}
export default Prescription;
