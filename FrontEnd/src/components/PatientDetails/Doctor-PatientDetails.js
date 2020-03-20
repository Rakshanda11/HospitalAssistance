import React from "react";
import "./Doctor-PatientDetails.css";
class Doctor_PatientDetails extends React.Component {
  render() {
    return (
      <div className="align-details">
        <div className="styling-details">
          <p>Name: </p>
          <p className="attribute-styling"> {" " + this.props.patient.name}</p>
        </div>
        <div className="styling-details">
          <p>Age: </p>
          <p className="attribute-styling"> {" " + this.props.patient.age}</p>
        </div>
      </div>
    );
  }
}
export default Doctor_PatientDetails;
