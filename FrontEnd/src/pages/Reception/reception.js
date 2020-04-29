import React, { Component } from "react";
import "./reception.css";
import Patiententry from "../../components/patiententry/patiententry";
// import Patientlist from "../../components/patientlist/patientlist";
import ExistingPatient from "../../components/ExistingPatient/ExistingPatient";
import AvailableDoctors from "../../components/AvailableDoctors/AvailableDoctors";
// import receptionist from "../../components/receptionist.jpg";
import ReceptionNavigation from "./Navigation/mainNavigation";
import Backdrop from "../../components/Backdrop/Backdrop";
import SideDrawer from "./SideDrawer/SideDrawer";

import firebase from '../../firebase';

class Receptionpage extends Component {
  auth = firebase.auth();
  databaseRef = firebase.firestore();
  patientsDatabaseRef = this.databaseRef.collection("Patients")
  daywiseDatabaseRef = this.databaseRef.collection("Everyday-Patients")
  usersDatabaseRef = this.databaseRef.collection("Users")

  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      doctors: {},
      patientList: [],
      newpatient: true
    };
  }

  componentDidMount() {
    // Get all users who are doctors
    var tempList = {}
    this.usersDatabaseRef
      .where("type", "==", "Doctor")
      .get()
      .then((doctorsSnapshot) => {
        doctorsSnapshot.forEach((doc) => {
          tempList[doc.data().name] = <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        })
        this.setState({
          doctors: tempList
        }, () => {
          Object.keys(this.state.doctors).map((doctorName) => {
            // Search all patients in reception queue with doctor name as this name
            var today = (new Date()).toDateString();

            this.daywiseDatabaseRef
              .doc(today)
              .collection("Reception")
              .where("doctorselected", "==", doctorName)
              .get()
              .then((patientsSnapshot) => {
                tempList[doctorName] = patientsSnapshot.docs.length;
                this.setState({
                  doctors: tempList
                })
              })
              .catch(error => { console.log(error) })
              return 1
          })

        })
        // Now go to day-wise database and search for these doctors

      })
      .catch(error => { console.log(error) })
  }

  updateList = patient => {
    // Also update the number of patients assigned to the respective doctor
    var doctorName = patient["doctorselected"];
    var doctorList = this.state.doctors;
    doctorList[doctorName] += 1;
    this.setState({
      doctors: doctorList
    })

    var tempArray = this.state.patientList;

    if (patient.name) tempArray.push({ ...patient });
    this.setState({
      patientList: tempArray.slice()
    });
    console.log(this.state.patientList);
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  switchModeHandler = () => {
    this.setState(prevState => {
      return { newpatient: !prevState.newpatient };
    });
  };


  backDropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backDrop;
    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backDropClickHandler}></Backdrop>;

    }

    return (
      <div className="Container">
        <ReceptionNavigation
          drawerClickHandler={this.drawerToggleClickHandler}
          diagnosis={this.diagnosis}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
        ></ReceptionNavigation>
        <SideDrawer
          drawerClickHandler={this.props.drawerToggleClickHandler}
          diagnosis={this.diagnosis}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
          show={this.state.sideDrawerOpen}
        ></SideDrawer>
        {backDrop}
        <div className="row">
          <React.Fragment>

            <div className="col-sm-6 ">

              {(!this.state.newpatient)
                ? <ExistingPatient />
                : <Patiententry updateFunction={this.updateList} doctors={this.state.doctors} />}

              <button onClick={this.switchModeHandler} className="buttonexisting">
                {this.state.newpatient ? "Existing Patient" : "New Patient"}
              </button>

            </div>
            <div className="col-sm-6">
              <AvailableDoctors doctors={this.state.doctors} />
              {/* <Patientlist list={this.state.patientList} /> */}
            </div>
            {/* <div className="col-sm-4 image">
              <img className="imag" src={receptionist} alt="receptionist" />
            </div> */}
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default Receptionpage;
