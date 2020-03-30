import React from "react";
import "./doctor.css";
import DocImg from "./Doctor.jpg";
import Instruction from "./Extras/Instructions";
// import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Prescription from "./Extras/DoctorPrescription";
// import SuggestTest from "./DoctorTest";
import ShowDetails from "../../components/PatientDetails/Doctor-PatientDetails";
import GetPatientHistory from "./Extras/GetPatientHistory";
import DoctorPageStart from "./Extras/StartDoctor";
import DoctorNavigation from "./Navigation/doctorsNavigation";
import SideDrawer from "./SideDrawer/doctorSideDrawer";
import Backdrop from "../../components/Backdrop/Backdrop";
import DoctorDiagnosis from "./Extras/DoctorDiagnosis";

// import AssignedList from '../../components/DoctorsModule/AssignedList'
class Doctor extends React.Component {
  constructor(props) {
    super(props);
    this.patientsList = [
      {
        name: "Rakshanda Mahajan",
        age: "50",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "1",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ],
        Tests: [
          'Haemogram',
          'COVID-19',
          'Malaria'
        ]
      },
      {
        name: "Ajit Niras",
        age: "80",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "2",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ]
      },
      {
        name: "Satvik Dandale",
        age: "20",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "3",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ]
      },
      {
        name: "Sanjana Jaiswal",
        age: "67",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "4",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ]
      }
    ];
    this.state = {
      sideDrawerOpen: false,
      showDetails: false,
      showHistory: false,
      mainBody: <DoctorPageStart />,
      currentPatient: this.patientsList[0]
    };
  } // Contructor ends here

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backDropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

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
          <GetPatientHistory patient={this.state.currentPatient} />
        </>
      )
    });
  };

  diagnosis = () => {
    this.setState({
      mainBody: (
        <>
          <ShowDetails patient={this.state.currentPatient} />
          <DoctorDiagnosis></DoctorDiagnosis>
        </>
      )
    });
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
    let backDrop;
    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backDropClickHandler}></Backdrop>;
    }
    return (
      <>
        {/* {this.props.navBar} */}
        <DoctorNavigation
          drawerClickHandler={this.drawerToggleClickHandler}
          diagnosis={this.diagnosis}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
        />
        <SideDrawer
          drawerClickHandler={this.props.drawerToggleClickHandler}
          diagnosis={this.diagnosis}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
          show={this.state.sideDrawerOpen}
        ></SideDrawer>
        {backDrop}
        <div className="row">
          <div className="col-sm-3 listOuter">
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
