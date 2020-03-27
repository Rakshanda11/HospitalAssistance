import React from 'react';
import './Lab.css';
import LabImg from '../../components/Lab.jpg';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import SuggestedTextBox from '../../components/Navigation/suggestedTest';
import ShowDetails from '../../components/PatientDetails/Doctor-PatientDetails';
import Instruction from "../../components/LabModule/LabInstructions";
class Lab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        }
    }
    patientsList = [
        {
            name: "Patient 1",
            age: "50",
            phoneNo : "9876543210",
            PatientId: "1"
        },
        {
            name: "Patient 2",
            age: "60",
            phoneNo : "9876543210",
            PatientId: "2"
        },
        {
            name: "Patient 3",
            age: "44",
            phoneNo : "9876543210",
            PatientId: "3"
        },
        {
            name: "Patient 4",
            age: "48",
            phoneNo : "9876543210",
            PatientId: "4"
        }
    ];
    handleClickArg = (item) => {
        this.setState({
            showDetails: true
        })
        this.tempShowDetails = <ShowDetails detail={item} />
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-3" >
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
                </div>

                <div className="col-sm-5 border backgroundstyle">
                    {this.state.showDetails ? this.tempShowDetails : null}
                    <p className="changeFonts">Lab Report:</p>
                    <br />
                    <input type="file" />
                    <div>
                        <br />
                        <SuggestedTextBox message="Any Remarks?" />
                        <button type="button" className="btn btn-dark" >Submit</button>
                    </div>

                </div>
                <div className="col-sm-4 image" >
                    <img src={LabImg} className="rounded-circle" alt="Lab_img" />
                </div>



            </div>
        );
    }
}
export default Lab;