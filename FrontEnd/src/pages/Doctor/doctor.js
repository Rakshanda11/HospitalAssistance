import React from "react";
import "./doctor.css";
import Instruction from "./Extras/Instructions";
import Prescription from "./Extras/DoctorPrescription";
import ShowDetails from "../../components/PatientDetails/Doctor-PatientDetails";
import GetPatientHistory from "./Extras/GetPatientHistory";
import DoctorPageStart from "./Extras/StartDoctor";
import DoctorNavigation from "./Navigation/doctorsNavigation";
import SideDrawer from "./SideDrawer/doctorSideDrawer";
import Backdrop from "../../components/Backdrop/Backdrop";
import DoctorDiagnosis from "./Extras/DoctorDiagnosis";

import { Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import firebase from './../../firebase';

class Doctor extends React.Component {
  databaseRef = firebase.firestore();
  daywiseRef = this.databaseRef.collection("Everyday-Patients");
  patientRef = this.databaseRef.collection("Patients");
  auth = firebase.auth();

  constructor(props) {
    super(props);
    this.newPatientsList = [
      {
        name: "Rakshanda Mahajan",
        age: "50",
        weight: "50",
        phoneNo: "9876543210",
        patientId: "1",
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
        patientId: "2",
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
        patientId: "3",
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
        patientId: "4",
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
    this.investigatedPatientsList = [
      {
        name: "Rakshanda Mahajan2",
        age: "50",
        weight: "50",
        phoneNo: "9876543210",
        patientId: "1",
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
        name: "Ajit Niras",
        age: "80",
        weight: "50",
        phoneNo: "9876543210",
        patientId: "2"
      },
      {
        name: "Satvik Dandale",
        age: "20",
        weight: "50",
        phoneNo: "9876543210",
        patientId: "3"
      },
      {
        name: "Sanjana Jaiswal",
        age: "67",
        weight: "50",
        phoneNo: "9876543210",
        patientId: "4"
      }
    ];
    this.state = {
      sideDrawerOpen: false,
      showDetails: false,
      showHistory: false,
      mainBody: <DoctorPageStart />,
      currentPatient: null,
      receptionQueue: [],
      investigatedQueue: [],
      showAlert: false,
      alertText: "Error",
      color: "danger"
    };
  } // Contructor ends here

  testsOnSubmit = () => {
    this.setState({
      mainBody: <DoctorPageStart />
    }, () => {
      this.diagnosisData = {}
    });
  }
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backDropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  diagnosisData = {}
  diagnosisChangeHandler = (diagnosisData) => {
    this.diagnosisData = diagnosisData;
  }

  prescriptionData = []
  tempPrescriptionData = {}
  prescriptionChangeHandler = (prescriptionData, tempPrescriptionData) => {
    this.prescriptionData = prescriptionData;
    this.tempPrescriptionData = tempPrescriptionData;
  }

  getPatientHistory = () => {
    if (this.state.currentPatient == null) {
      this.alertUser("Select a Patient First!");
      return;
    }
    var visits = {}
    this.patientRef
      .doc(this.state.currentPatient.adhaarid)
      .collection("Visits")
      .get()
      .then((visitsDocs) => {
        visitsDocs.forEach((visit) => {
          visits[visit.id] = visit.data()
        })
        if (Object.keys(visits).length) {
          this.setState({
            mainBody: (
              <>
                <ShowDetails patient={this.state.currentPatient} />
                <GetPatientHistory
                  patient={this.state.currentPatient}
                  visits={visits}
                  alertFunction={this.alertUser} />
              </>
            )
          });
        } else {
          this.alertUser("This patient does not have any history stored.")
        }
      })
      .catch(error => { this.alertUser(error) })

  };

  diagnosis = () => {
    if (this.state.currentPatient == null) {
      this.alertUser("Select a Patient First!");
      return;
    }
    this.setState({
      mainBody: (
        <>
          <ShowDetails patient={this.state.currentPatient} />
          <DoctorDiagnosis
            currentPatient={this.state.currentPatient}
            onSubmitFun={this.testsOnSubmit}
            diagnosisChangeHandler={this.diagnosisChangeHandler}
            diagnosisData={this.diagnosisData}
            doctorName={this.props.currentUser.name}
            prescriptionData={this.prescriptionData}
            alertFunction={this.alertUser}
          />
        </>
      )
    });
  };

  currentIssues = () => {
    if (this.state.currentPatient == null) {
      this.alertUser("Select a Patient First!");
      return;
    }
    this.setState({
      mainBody: (
        <>
          {/* <ShowDetails patient={this.state.currentPatient} /> */}
          <Prescription
            patient={this.state.currentPatient}
            doctor={this.props.currentUser.name}
            prescriptionChangeHandler={this.prescriptionChangeHandler}
            prescriptionData={this.prescriptionData}
            alertFunction={this.alertUser} />
        </>
      )
    });
  };

  getToday = () => {
    var today = new Date();
    return today.toDateString();
  }

  alertUser = (text, color = "danger") => {
    this.setState({
      loading: false,
      color: color,
      showAlert: true,
      alertText: text,
    })
  }

  toggleAlert = () => {
    this.setState(prevState => ({
      showAlert: !prevState.showAlert
    }))
  }

  render() {
    if (this.props.currentUser === null
      || this.props.currentUser.type !== "Doctor") {
      this.props.history.push("/auth")
      return (<div></div>);
    }

    let backDrop;
    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backDropClickHandler}></Backdrop>;
    }

    // FIREBASE STUFF
    var today = this.getToday();

    // New patient list comes from reception queue
    var queryReception = this.daywiseRef.doc(today).collection("Reception");

    // Investigated list comes from investigated queue
    var queryInvestigated = this.daywiseRef.doc(today).collection("Investigated");

    // Update only once
    if (!(this.isUpdated)) {
      queryReception.onSnapshot((querySnapshot) => {
        var tempList = [];
        querySnapshot.forEach((patientDoc) => {
          var patient = patientDoc.data();
          if (patient.doctorselected === this.props.currentUser.name)
            tempList.push(patient)
        })
        if (!(tempList.length))
          tempList = ["EMPTY"]
        this.setState({
          receptionQueue: tempList
        })
      })
      queryInvestigated.onSnapshot((querySnapshot) => {
        var tempList = [];
        querySnapshot.forEach((patientDoc) => {
          var patient = patientDoc.data();
          if (patient.doctorselected === this.props.currentUser.name)
            tempList.push(patient)
        })
        if (!(tempList.length))
          tempList = ["EMPTY"]
        this.setState({
          investigatedQueue: tempList
        })
      })
      this.isUpdated = true;
    }

    return (
      <>
        <div className="alert-div">
          <div className="alert-container">
            <Alert color={this.state.color}
              isOpen={this.state.showAlert}
              toggle={this.toggleAlert}
            >{this.state.alertText}</Alert>
          </div>
        </div>

        {/* {this.props.navBar} */}
        <DoctorNavigation
          drawerClickHandler={this.drawerToggleClickHandler}
          diagnosis={this.diagnosis}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
          doctorName={this.props.currentUser.name}
          // doctorName={"Doctor A"}
          auth={this.auth}
          logOutHandler={this.props.update}
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
                patientsList={this.state.receptionQueue}
                oldPatientsList={this.state.investigatedQueue}
                // patientsList={this.newPatientsList}
                // oldPatientsList={this.investigatedPatientsList}
                updatePatient={(patient, type) => {
                  if (Object.keys(this.diagnosisData).length) {
                    if (this.state.currentPatient !== null && this.state.currentPatient !== patient) {
                      this.alertUser("This Patient has unsaved changes");
                      return;
                    }
                  }

                  if (Object.keys(this.tempPrescriptionData).length || this.prescriptionData.length) {
                    if (this.state.currentPatient !== null && this.state.currentPatient !== patient) {
                      this.alertUser("This Patient has other unsaved changes");
                      return;
                    }
                  }

                  patient["type"] = type
                  if (type === "Investigated") {
                    this.diagnosisData = patient.diagnosisData
                  }
                  this.setState({
                    mainBody: <ShowDetails patient={patient} />,
                    currentPatient: patient
                  });

                }}
              />
            </div>
          </div>

            <div className="border backgroundstyle">
                {this.state.mainBody}
            </div>

        </div>

      </>

    );
  }
}
export default withRouter(Doctor);
