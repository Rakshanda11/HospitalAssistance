import React from 'react';
import './doctor.css';
import DocImg from './Doctor.jpg'
import Instruction from '../../components/DoctorsModule/Instructions'
// import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Prescription from './DoctorPrescription'
import SuggestTest from './DoctorTest'
import ShowDetails from '../../components/PatientDetails/Doctor-PatientDetails'
import GetPatientHistory from '../../components/DoctorsModule/InsertCurrentDetails';
// import AssignedList from '../../components/DoctorsModule/AssignedList'
class Doctor extends React.Component {
    constructor(props) {
        super(props);
        console.log("Bind successful");
        
        this.state = {
            showDetails: false,
            showHistory:false
        }
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
    }
   
    // handleClickArg = (item) => {
    //     this.tempShowDetails = <ShowDetails detail = {item}/>
    //     this.setState({
    //         showDetails: true
    //     })

    // }
    // handleClick(event) {
    //    this.handleClickArg(event, item);
    // }
    removePatient = () => {
        this.patientsList.shift();
        console.log(this.patientsList);
    };
    cons =() =>{
        console.log("In cons");
    }
    render() {
        var ShowHistory,askHistory
        if(this.showHistory){
            ShowHistory = <GetPatientHistory patient = {this.patientsList[0]}/>
        }
        else if(!this.showHistory){
            askHistory = <button type="button" className="btn btn-danger alignbutton" onClick={this.cons} >History</button> 
        }
        return (
            <div className="row">
                <div className="col-sm-3" >
                    <div className="patient_list">
                        {/* <h6 className="patient_header">List Of Patients</h6> */}
                        {/* <ListGroup className="for_padding" defaultActiveKey="">
                            {this.patientsList.map(function (d, idx) {
                                return (
                                    // this.element(d, idx)
                                    <ListGroupItem key={idx} variant="primary" onClick={() => {
                                        this.handleClickArg(d)
                                    }}>
                                        {d.name}
                                    </ListGroupItem>
                                );
                            }.bind(this))}
                        </ListGroup> */}
                        <Instruction patientsList ={this.patientsList} />
                    </div>
                </div>

                <div className="col-sm-5 border backgroundstyle">
                    <GetPatientHistory/>
                    {askHistory}
                    {ShowHistory}
                    {/* {this.state.showDetails ? this.tempShowDetails : null} */}
                    <ShowDetails patient ={this.patientsList[0]}/>
                    <Prescription />
                    <SuggestTest message ="Enter the Prescription" patientsList ={this.patientsList} funref ={this.removePatient} />
                </div>
                <div className="col-sm-4 image" >
                    <img src={DocImg} alt="Doctor_img" />
                </div>


            </div>
        );
    }
}
export default Doctor;