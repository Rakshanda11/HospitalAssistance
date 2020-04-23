import React from "react";
// import SuggestTest from "./DoctorTest";
import './DoctorPrescription.css';
import ShowDetails from '../../../components/PatientDetails/Doctor-PatientDetails';
import DoctorDetails from '../../../components/DoctorsModule/DoctorDetails';
import RXImg from '../../../components/DoctorsModule/rx_img.png';
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
          <DoctorDetails />
          <hr className="hr-style" />
          <ShowDetails patient={this.props.patient} />
          <hr className="hr-style" />
          <img src={RXImg} alt="RxImage" className="image-align" />
          <DosagePrescription prescriptionChangeHandler ={this.props.prescriptionChangeHandler} prescriptionData = {this.props.prescriptionData}/>
          
        </div>
      </div>
      // <div>
      //   <br />
      //   {/* <textarea
      //     rows="8"
      //     className="form-control"
      //     value={this.state.medicines}
      //     onChange={this.handleMedicine}
      //     onClick={this.clearInput}
      //   /> */}
      //   <div className="paper">
      //       <textarea
      //         className="text-area"
      //         placeholder="Enter Prescription "
      //         id="text"
      //         name="text"
      //         rows="4"
      //       ></textarea>
      //       <br />
      //     </div>


      //   {/* <SuggestTest
      //     message="Enter the Prescription"
      //     patientsList={this.patientsList}
      //     funref={this.removePatient}
      //   /> */}
      //   <button type="button" className="btn btn-dark submit">
      //     Submit
      //   </button>
      //     </div>
    );
  }
}
export default Prescription;
