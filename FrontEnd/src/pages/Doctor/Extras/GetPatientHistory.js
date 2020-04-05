import React from 'react';
import './GetPatientHistory.css';
class GetPatientHistory extends React.Component {
    getDateHistory = () => {
        console.log("hi");
    }
    render() {
        return (
            <>
                <h3>VISITED DATES</h3>
                <div className="list-group">
                    {this.item = this.props.patient.Visits.map((item) =>
                        <li key={item.Date} onClick={this.getDateHistory} className="list-group-item">{item.Date}</li>
                    )}
                </div>


            </>
        );
    }
}
export default GetPatientHistory;