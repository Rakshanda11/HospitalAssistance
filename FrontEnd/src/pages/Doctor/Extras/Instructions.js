import React from "react";
import List from "./AssignedList";
import "./Instructions.css";
class Instructions extends React.Component {

  render() {
    return (
      <>
        <div>
          <div className="headers-div">
            <h3 className="headerstyling ">New Patients</h3>
          </div>
          <List
            type="New"
            patientsList={this.props.patientsList}
            updatePatient={this.props.updatePatient}

          />
        </div>
        <br />
        <div>
        <div className="headers-div">
            <h3 className="headerstyling ">Investigated Patients</h3>
          </div>
          <List
            type="Investigated"
            patientsList={this.props.oldPatientsList}
            updatePatient={this.props.updatePatient}
          />
        </div>
      </>
    );
  }
}
export default Instructions;
