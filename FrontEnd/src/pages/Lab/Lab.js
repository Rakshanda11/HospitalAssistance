import React from 'react';
import './Lab.css';
import LabImg from '../../components/Lab.jpg';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import SuggestedTextBox from '../../components/Navigation/suggestedTest';
import ShowDetails from '../../components/PatientDetails/Doctor-PatientDetails'
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
    handleClickArg = (item) =>{
        this.setState({
            showDetails: true
        })
        this.tempShowDetails = <ShowDetails detail = {item}/>
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
                                    <ListGroupItem variant="primary" key={idx} 
                                    onClick ={ ()=>{
                                        this.handleClickArg(d);
                                    }}

                                    >{d.name}</ListGroupItem>
                                )
                            }.bind(this))};
                        </ListGroup>
                    </div>
                </div>
                <div className="col-sm-6">
                {this.state.showDetails ? this.tempShowDetails : null}
                    <p className="changeFonts">Submit The Report:</p>
                    <br />
                    <input type="file" />
                    <div>
                        <br />
                        <SuggestedTextBox message="Any Remarks?"/>
                        <button type="button" className="btn btn-dark" >Submit</button> 
                    </div>
                    
                </div>
                 <div className="col-sm-4 image" >
                        <img src={LabImg} class="rounded-circle" alt="Lab_img" />
                    </div> 



            </div>
        );
    }
}
export default Lab;