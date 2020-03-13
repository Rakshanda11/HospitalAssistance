import React from "react";
import "./patientlist.css";
// import Patiententry from '../patiententry/patiententry';
import PopUp from "./popUp";

class Patientlist extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      showPopup: false
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    return (
      <div>
        <h3 className="listpatient">Patient List</h3>
        {this.state.showPopup ? <PopUp  text='Click "Close Button" to hide popup'  
          closePopup={this.togglePopup.bind(this)}></PopUp> : null}
        <ul>
          {this.props.list
            ? this.props.list.map((patient, index) => (
                <li key={index} onClick={this.togglePopup}>
                  {/* {this.singlePatientRow(patient)} */}
                  <button className="buttonStyle">{patient.name}</button>
                </li>
              ))
            : null}
        </ul>
        {/* <h1>{this.props.name}</h1> */}
      </div>
    );
  }
}
export default Patientlist;
