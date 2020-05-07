import React from 'react';
import './DoctorDetails.css';
class DoctorDetails extends React.Component {
  render() {
    return (
      <div className="doctordetails divAlign row1">
        {/* <p className="highlighterdoc aligndetails name">Name: </p> */}
        <p className="attribute-styling name">{this.props.doctor}</p>
        <div className="spacer-doc"></div>
        {/* <p className="rightalign highlighterdoc pid">Contact No: </p> */}
        <p className="attribute-styling pid">Some Mobile Number</p>
      </div>
    );
  }
}
export default DoctorDetails;