import React from "react";
import "./Doctor-PatientDetails.css";
class Doctor_PatientDetails extends React.Component {
  render() {
    return (
      <div className="align-details">
        <div className="styling-details row1">
          <p className="highlighter aligndetails name">Name: </p>
          <p className="attribute-styling name"> {" " + this.props.patient.name}</p>
          <div className="spacer"></div>
          <p className= "rightalign highlighter pid">Patient ID: </p>
          <p className="attribute-styling pid"> {" " + this.props.patient.patientId}</p>
        </div>
        <div className="styling-details row2">
          <p className="highlighter aligndetails number">Contact No: </p>
          <p className="attribute-styling number"> {" " + this.props.patient.mob}</p>
          <div className="spacer"></div>
          <p className= "alignDetails highlighter age">Age: </p>
          <p className="attribute-styling age"> {" " + this.props.patient.age}</p>
          <div className="spacer"></div>
          <p className= "alignDetails highlighter weight">Weight: </p>
          <p className="attribute-styling weight"> {" " + this.props.patient.weight}</p>
        </div>
        
      </div>
    );
  }
}
export default Doctor_PatientDetails;
