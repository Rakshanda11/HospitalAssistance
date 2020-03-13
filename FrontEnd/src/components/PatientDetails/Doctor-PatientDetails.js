import React from "react";
// import  Item  from 'react-bootstrap/lib/Breadcrumb';
import "./Doctor-PatientDetails.css";
class Doctor_PatientDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="align-details">
        <div className="styling-details">
          <p>Name: </p>
          <p className="attribute-styling"> {" " + this.props.detail.name}</p>
        </div>
        <div className="styling-details">
          <p>Age: </p>
          <p className="attribute-styling"> {" " + this.props.detail.age}</p>
        </div>
      </div>
    );
  }
}
export default Doctor_PatientDetails;
