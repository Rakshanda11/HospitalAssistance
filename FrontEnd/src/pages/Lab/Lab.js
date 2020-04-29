import React from "react";
import "./Lab.css";

import ShowDetails from "../../components/PatientDetails/Lab-PatientsDetails";
import Instruction from "../../components/LabModule/LabInstructions";
import LabNavigation from "./Navigation/LabNavigation";
import Backdrop from "../../components/Backdrop/Backdrop";
import SideDrawer from "./SideDrawer/SideDrawer";
import StartLab from "../../components/LabModule/StartLab";

import firebase from "./../../firebase";

class Lab extends React.Component {
  today = (new Date()).toDateString();

  databaseRef = firebase.firestore();

  labQueueRef = this.databaseRef
    .collection("Everyday-Patients")
    .doc(this.today)
    .collection("Lab");


  constructor(props) {
    super(props);

    this.state = {
      sideDrawerOpen: false,
      showDetails: false,
      mainBody: <StartLab />,
      currentPatient: null,
      labQueue: []
    };
  }
  patientsList = [
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
        'Hemogram',
        'COVID-19',
        'Malaria',
        'Dengue'
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
      ],
      Tests: [
        'Hemogram',
        'COVID-19',
        'Malaria',
        'Typhoid'
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

  handleClickArg = item => {
    this.setState({
      showDetails: true
    });
    this.tempShowDetails = <ShowDetails detail={item} />;
  };
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
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

    // Retrieve the list of patients from lab queue
    if (!(this.isUpdated)) {
      this.labQueueRef.onSnapshot((querySnapshot) => {
        var tempList = [];
        querySnapshot.forEach((patientDoc) => {
          tempList.push(patientDoc.data())
        })
        if (!(tempList.length))
          tempList = ["EMPTY"]
        this.setState({
          labQueue: tempList
        })
      })

      this.isUpdated = true;
    }

    return (
      <>
        <LabNavigation
          drawerClickHandler={this.drawerToggleClickHandler}
          diagnosis={this.diagnosis}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
        ></LabNavigation>
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
              {/* <ListGroup className="for_padding" defaultActiveKey="">
                            {this.patientsList.map(function (d, idx) {
                                return (
                                    <ListGroupItem variant="primary" key={idx} 
                                    onClick ={ ()=>{
                                        this.handleClickArg(d);
                                    }}

                                    >{d.name}</ListGroupItem>
                                )
                            }.bind(this))};
                        </ListGroup> */}
              <div className="patient_list" >
                <Instruction
                  patientsList={this.state.labQueue}
                  // patientsList={this.patientsList}
                  updatePatient={patient => {
                    console.log(patient);
                    this.setState({
                      currentPatient: patient,
                      mainBody: (
                        <ShowDetails patient={patient} />
                      )
                    });
                  }}
                />
              </div>
            </div>
          </div>
          {/* <div className="seperator"></div> */}
          <div className=" border backgroundstyle">{this.state.mainBody}</div>
          {/* {this.state.showDetails ? this.tempShowDetails : null}
            <p className="changeFonts">Lab Report:</p>
            <br />
            <input type="file" />
            <div>
              <br />
              <SuggestedTextBox message="Any Remarks?" />
              <button type="button" className="btn btn-dark">
                Submit
              </button>
            </div> */}
          {/* <div className="col-sm-4 image">
            <img src={LabImg} className="rounded-circle" alt="Lab_img" />
          </div> */}
        </div>

      </>
    );
  }
}
export default Lab;
