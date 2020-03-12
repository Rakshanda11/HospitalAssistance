import React from 'react';
import './doctor.css';
import DocImg from './Doctor.jpg'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Prescription from './DoctorPrescription'
import SuggestTest from './DoctorTest'
class Doctor extends React.Component {
    constructor(props) {
        super(props);
        // this.getInfo = this.getInfo.bind(this);
        this.handleClick = this.handleClick.bind(this);
        console.log("Bind successful");
    }
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
    handleClick(event) {
        // console.log(details);
        console.log("In getinfp");
    }
    element = (item, key) => {
        return (
            <ListGroupItem key={key} variant="primary">
                {item.name}
            </ListGroupItem>
        );
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-2" >
                    <div className="patient_list">
                        <h6 className="patient_header">List Of Patients</h6>
                        <ListGroup className="for_padding" defaultActiveKey="">
                            {this.patientsList.map(function (d, idx) {
                                return (
                                    // this.element(d, idx)
                                    <ListGroupItem key={idx} variant="primary" onClick={this.handleClick}>
                                        {d.name}
                                    </ListGroupItem>
                                );
                            }.bind(this))}
                        </ListGroup>
                    </div>
                </div>

                <div className="col-sm-6">
                    <Prescription />
                    <SuggestTest />
                </div>
                <div className="col-sm-3" >
                    <img src={DocImg} alt="Doctor_img" />
                </div>


            </div>
        );
    }
}
export default Doctor;