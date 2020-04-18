import React from "react";
import { Card, Table } from 'reactstrap';
import FreeScrollbar from "react-free-scrollbar";
import "./AvailableDoctors.css";

class AvailableDoctors extends React.Component {
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

    }


    render() {
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
