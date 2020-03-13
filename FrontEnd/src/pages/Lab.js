import React from 'react';
import './Lab.css';
import LabImg from '../components/Lab.png';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import SuggestedTextBox from '../components/Navigation/suggestedTest';
import Submit from '../components/Navigation/submitButton'
class Lab extends React.Component {
    patientsList = [
        {
            name: "Patient 1",
            age: "50"
        },
        {
            name: "Patient 2",
            age: "50"
        },
        {
            name: "Patient 3",
            age: "50"
        }
    ];
    render() {
        return (
            <div className="row">
                <div className="col-sm-2" >
                    <div className="patient_list">
                        <h6 className="patient_header">List Of Patients</h6>
                        <ListGroup className="for_padding" defaultActiveKey="">
                            {this.patientsList.map(function (d, idx) {
                                return (
                                    <ListGroupItem variant="primary" key={idx}

                                    >{d.name}</ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </div>
                </div>
                <div className="col-sm-6">
                    <p className="changeFonts">Submit The Report:</p>
                    <br />
                    <input type="file" />
                    <div>
                        <br />
                        <SuggestedTextBox message="Any Remarks?"/>
                        <Submit/>   
                    </div>
                    <div className="col-sm-2" >
                        <img src={LabImg} alt="Lab_img" />
                    </div>
                </div>



            </div>
        );
    }
}
export default Lab;