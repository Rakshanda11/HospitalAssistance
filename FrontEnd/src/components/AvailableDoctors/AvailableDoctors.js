import React from "react";
import { Card, Table } from 'reactstrap';
import FreeScrollbar from "react-free-scrollbar";
import "./AvailableDoctors.css";

class AvailableDoctors extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);

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
                                    <th>Name </th>
                                    <th>Assigned Patient</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {this.props.list
                                    ? this.props.list.map((patient, index) => ( */}

                                <tr >

                                    <td>Dr. AJit Niras</td>


                                    <td>
                                        10
                                            </td>
                                </tr>
                                <tr >

                                    <td>Dr.Niras</td>


                                    <td>
                                        15
</td>
                                </tr>
                                {/* )) : null} */}
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
