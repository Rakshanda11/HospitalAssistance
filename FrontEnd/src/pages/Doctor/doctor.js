import React from "react";
import "./doctor.css";
import DocImg from "./Doctor.jpg";
import Instruction from "../../components/DoctorsModule/Instructions";
// import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Prescription from "./DoctorPrescription";
// import SuggestTest from "./DoctorTest";
import ShowDetails from "../../components/PatientDetails/Doctor-PatientDetails";
import GetPatientHistory from "../../components/DoctorsModule/GetPatientHistory";
import DoctorPageStart from "../../components/DoctorsModule/StartDoctor";
import DoctorNavigation from "../../components/Navigation/doctorsNavigation";
// import AssignedList from '../../components/DoctorsModule/AssignedList'
class Doctor extends React.Component {
  constructor(props) {
    super(props);
    this.patientsList = [
      {
        name: "Patient 1",
        age: "50"
      },
      {
        name: "Patient 2",
        age: "80"
      },
      {
        name: "Patient 3",
        age: "20"
      },
      {
        name: "Patient 4",
        age: "67"
      }
    ];
    this.state = {
      showDetails: false,
      showHistory: false,
      mainBody: <DoctorPageStart />,
      currentPatient: this.patientsList[0]
    };
  } // Contructor ends here

  removePatient = () => {
    this.patientsList.shift();
  };
  detailsfun = () => {
    this.setState({
      mainBody: <ShowDetails patient={this.state.currentPatient} />
    });
  };
  getPatientHistory = () => {
    //   if (this.state.currentPatient)
    this.setState({
      mainBody: (
        <>
          <ShowDetails patient={this.state.currentPatient} />
          <GetPatientHistory />
        </>
      )
    });
  };
  insertVitalsigns = () => {
    alert("InsertVitalSigns");
  };
  currentIssues = () => {
    this.setState({
      mainBody: (
        <>
          <ShowDetails patient={this.state.currentPatient} />
          <Prescription />
        </>
      )
    });
  };

  render() {
    return (
      <>
        {/* {this.props.navBar} */}
        <DoctorNavigation
          currentPage={this.state.currentPage}
          drawerClickHandler={this.props.drawerToggleClickHandler}
          diagnosis={this.insertVitalsigns}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
        />
        <div className="row">
          <div className="col-sm-3">
            <div className="patient_list">
              <Instruction
                patientsList={this.patientsList}
                updatePatient={patient => {
                  this.setState({
                    currentPatient: patient,
                    mainBody: (
                      <ShowDetails patient={this.state.currentPatient} />
                    )
                  });
                }}
              />
            </div>
          </div>
          <div className="border backgroundstyle">{this.state.mainBody}</div>
          <div className="imageDiv">
            <img src={DocImg} alt="Doctor_img" />
          </div>
        </div>
      </>
    );
  }
}
export default Doctor;
