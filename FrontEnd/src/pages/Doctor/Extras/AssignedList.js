import React from "react";
import { Card, Table } from "reactstrap";
import Loading from "./Loading";
import "./AssignedList.css";
class AssignedPatients extends React.Component {
  state = {
    waiting: <Loading />
  }
  isUpdated = false;

  render() {
    if (!this.isUpdated) {
      // After 3 seconds, the loading gif will be replaced with the text
      setTimeout(() => {
        if (this.props.patientsList[0] === "EMPTY")
          this.setState({
            waiting: <h4 style={{ textAlign: "center" }}>No Patients Yet</h4>
          })
        else
          this.setState({
            waiting: <h4 style={{ textAlign: "center" }}>Failed to retrieve data!!!</h4>
          })
      }, 3000)
      this.isUpdated = true;
    }

    // if (this.props.type === "Investigated")
    //   console.log(this.props.patientsList)
      

    return (
      <Card className="border-secondary ">
        <div className="table-wrapper-scroll-y my-custom-scrollbar" >
         
            {(this.props.patientsList.length && this.props.patientsList[0] !== "EMPTY") ? (
              <Table bordered hover striped className="changestyling">
                <thead>
                  <tr>
                    <th>Name </th>
                    <th
                      style={{
                        textAlign: "center"
                      }}
                    >
                      Patient ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.patientsList.map(record => (
                    <tr
                      key={record.patientId}
                      onClick={() => {
                        this.props.updatePatient(record, this.props.type);
                      }}
                    >
                      <td>{record.name}</td>

                      <td style={{ textAlign: "center" }}>
                        {record.patientId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
                this.state.waiting
              )}
          
        </div>
      </Card>
    );
  }
}
export default AssignedPatients;
