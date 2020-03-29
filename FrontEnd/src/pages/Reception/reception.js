import React, { Component } from "react";
import "./reception.css";
import Patiententry from "../../components/patiententry/patiententry";
import Patientlist from "../../components/patientlist/patientlist";
import receptionist from "../../components/receptionist.jpg";
import ReceptionNavigation from "./Navigation/mainNavigation";
import Backdrop from "../../components/Backdrop/Backdrop";
import SideDrawer from "./SideDrawer/SideDrawer";

class Receptionpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      patientList: []
    };
  }
  updateList = patient => {
    var tempArray = this.state.patientList;
    // tempArray.push({
    //     name: patient.name,
    //     age: patient.age,
    //     hieght: patient.hieght,
    //     weight: patient.weight,
    //     adharid: patient.adharid,
    //     address: patient.address

    // });
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
            <div className="col-sm-4 ">
              <Patiententry updateFunction={this.updateList} />
            </div>
            <div className="col-sm-4">
              <Patientlist list={this.state.patientList} />
            </div>
            <div className="col-sm-4 image">
              <img className="imag" src={receptionist} alt="receptionist" />
            </div>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default Receptionpage;
