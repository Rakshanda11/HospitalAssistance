import React from "react";
import { Card, Table } from 'reactstrap';
import FreeScrollbar from "react-free-scrollbar";
import "./AvailableDoctors.css";
import firebase from '../../firebase';

class AvailableDoctors extends React.Component {
<<<<<<< Updated upstream
    state = {
        Doctors: {
            "Doctor A": 12,
            "Doctor B" :16
        }
=======
    constructor(props) {
        super(props);
        this.Doctors = [{
            Name: "Doctor A",
            Assigned_Patient: "50"
        },
        {
            Name: "Doctor B",
            Assigned_Patient: "40"
        }
        ];

>>>>>>> Stashed changes
    }
    
    isUpdated = false;

    databaseRef = firebase.firestore();

    patientRef = this.databaseRef.collection("Patients");
    daywiseRef = this.databaseRef.collection("Everyday-Patients");

    getToday = () => {
        var today = new Date();
        return today.toDateString();
    }

    render() {
        var today = this.getToday();
        
        // Query

        var query  = this.daywiseRef
            .doc(today)
            .collection("Reception")

        if (!(this.isUpdated)){
            query.onSnapshot((patientsQueueSnap) => {
                var temp = {}
                // For each patient, check its doctor and increment accordingly
                patientsQueueSnap.forEach((patientDoc) => {
                    var doctor = patientDoc.data().doctorselected
                    if (doctor === undefined)
                        return;

                    if (temp[doctor])
                        temp[doctor] += 1
                    else
                        temp[doctor] = 1
                    this.setState({
                        Doctors: temp
                    })
                })
            })
            this.isUpdated = true;
        }
        // Add event listener to the query - Actually fire the query now
        

        return (
            <Card className="border-secondary ">
                <div style={{ width: '100%', height: '50vh' }}>
                    <h3 className="listpatient">Doctors List</h3>

                    <FreeScrollbar>
                        <Table bordered hover striped className="changestyling">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }}>Name </th>
                                    <th style={{ textAlign: "center" }}>Assigned Patient</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.Doctors.map(record => (
                                    <tr
                                        key={record.Name}
                                        onClick={() => {
                                            console.log(record.Name);
                                        }}
                                    >
                                        <td style={{ textAlign: "center" }}>{record.Name}</td>

                                        <td style={{ textAlign: "center" }}>
                                            {record.Assigned_Patient}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </FreeScrollbar>

                    {/* <h1>{this.props.name}</h1> */}
                </div>
            </Card>
        );
    }
}
export default AvailableDoctors;
