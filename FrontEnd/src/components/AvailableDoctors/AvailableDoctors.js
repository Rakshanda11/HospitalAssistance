import React from "react";
import { Card, Table } from 'reactstrap';
import FreeScrollbar from "react-free-scrollbar";
import "./AvailableDoctors.css";


class AvailableDoctors extends React.Component {
    isUpdated = false;

    state = {
        Doctors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: nextProps.doctors
            })
        }
    }

    componentDidMount() {
        this.setState({
            doctors: this.props.doctors
        })
    }

    getToday = () => {
        var today = new Date();
        return today.toDateString();
    }

    render() {

        return (
            <Card className="border-secondary ">
                <div style={{ width: '100%', height: '50vh' }}>
                    <div className="reception-label">
                        <h3 className="listpatient">Doctors List</h3>
                    </div>

                    <FreeScrollbar>
                        <Table bordered hover striped className="changestyling">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }}>Name </th>
                                    <th style={{ textAlign: "center" }}>Assigned Patients</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.doctors
                                ? Object.keys(this.state.doctors).map((name, index) => {
                                    return (<tr
                                        key={name}
                                        onClick={() => {
                                            console.log(name);
                                        }}
                                    >
                                        <td style={{ textAlign: "center" }}>{name}</td>

                                        <td style={{ textAlign: "center" }}>
                                            {this.state.doctors[name]}
                                        </td>
                                    </tr>);
                                })
                            : null}
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