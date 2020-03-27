import React from 'react';
import { Card, Table } from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';
import Loading from '../DoctorsModule/Loading';
import './LabAssignedList.css';
class AssignedPatients extends React.Component {
    goOnPatient = () =>{
        console.log(this.record.name);
    }
    render() {
        return (
            <Card className="border-secondary ">
                
                <div style={{ width: '100%', height: '30vh' }}>
                    <FreeScrollBar >
                        {(this.props.patientsList.length ? (
                            <Table bordered hover striped className="changestyling">
                                <thead>
                                    <tr>
                                        <th>Name </th>
                                        <th>Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.patientsList.map(record => (

                                        <tr key = {record.name} onClick={() => {
                                            console.log(record.name);
                                            this.props.updatePatient(record);
                                            
                                        }}>
                                            
                                            <td>{record.name}</td>
                                            

                                            <td>
                                                {record.PatientId}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                                <Loading />
                            )
                        )}
                    </FreeScrollBar>
                </div>
            </Card>
        );
    }
}
export default AssignedPatients;
