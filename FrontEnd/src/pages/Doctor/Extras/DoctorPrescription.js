import React from "react";
// import SuggestTest from "./DoctorTest";
import './DoctorPrescription.css';
import ShowDetails from '../../../components/PatientDetails/Doctor-PatientDetails';
import DoctorDetails from '../../../components/DoctorsModule/DoctorDetails';
import htmlToImage from 'html-to-image';
import DosagePrescription from './DosagePrescription';

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
      <div className="prescriptionsec">
        <div className="flex-rectangle styling-details">
          <DoctorDetails doctor={this.props.doctor}/>
          <hr className="hr-style" />
          <div className="patient-details-section">
            <ShowDetails patient={this.props.patient} />
          </div>
          <hr className="hr-style" />
          <DosagePrescription 
            patient={this.props.patient} 
            prescriptionChangeHandler={this.props.prescriptionChangeHandler} 
            prescriptionData={this.props.prescriptionData}
            alertFunction={this.props.alertFunction}  
          />
            
          <div className="buttons-align">
            <button className="btn btn-warning align-print" onClick={() => {
              var node = document.getElementById("print-paper");
              htmlToImage.toJpeg(node)
                .then((dataUrl) => {
                  require("downloadjs")(dataUrl, "print-Image.jpg")
                })
                .catch(error => {
                  console.log("Printing Error")
                })
            }}>Print</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Prescription;
