import React from "react";
import SuggestTest from "./DoctorTest";
import './DoctorPrescription.css';
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
      <div>
        <br />
        {/* <textarea
          rows="8"
          className="form-control"
          value={this.state.medicines}
          onChange={this.handleMedicine}
          onClick={this.clearInput}
        /> */}
        <div className="paper">
            <textarea
              className="text-area"
              placeholder="Enter Prescription "
              id="text"
              name="text"
              rows="4"
            ></textarea>
            <br />
          </div>
          
        
        {/* <SuggestTest
          message="Enter the Prescription"
          patientsList={this.patientsList}
          funref={this.removePatient}
        /> */}
        <button type="button" className="btn btn-dark submit">
          Submit
        </button>
          </div>
    );
  }
}
export default Prescription;
