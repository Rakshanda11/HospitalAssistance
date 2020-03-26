import React from "react";
import "./Doctor-PatientDetails.css";
class Doctor_PatientDetails extends React.Component {
  render() {
    return (
      <div className="align-details">
        <div className="styling-details">
          <p className="highlighter aligndetails">Name: </p>
          <p className="attribute-styling"> {" " + this.props.patient.name}</p>
          <p className= "rightalign highlighter">Patient ID: </p>
          <p className="attribute-styling"> {" " + this.props.patient.PatientId}</p>
        </div>
        <div className="styling-details">
          
        </div>
        <div className="styling-details">
          <p className="highlighter aligndetails">Contact No: </p>
          <p className="attribute-styling"> {" " + this.props.patient.phoneNo}</p>
          <p className= "alignDetails highlighter">Age: </p>
          <p className="attribute-styling"> {" " + this.props.patient.age}</p>
          <p className= "alignDetails highlighter">Weight: </p>
          <p className="attribute-styling "> {" " + this.props.patient.weight}</p>
        </div>
        
      </div>
    );
  }
}
export default Doctor_PatientDetails;
