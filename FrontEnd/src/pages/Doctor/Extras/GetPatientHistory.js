import React from 'react';
import './GetPatientHistory.css';
import HistoryList from './HistoryList';
import Ppage from './Ppage';
class GetPatientHistory extends React.Component {
    date = null;
    getDateHistory = (date) => {
        this.date = date;
    }
    render() {
        console.log("Visits:")
        console.log(this.props.patient.Visits)
        return (
            <>
                <card>
                    {
                        <HistoryList historyList={this.props.patient.Visits} getDateHistory = {this.getDateHistory}/>
         
                    }
                    <hr className="hrhis"></hr>
                   {
                       this.props.patient?<Ppage current_p={this.props.patient} date = {this.date}/>:null
                   }
                   
                </card>

                {/* <div className="list-group">
                    {this.item = this.props.patient.Visits.map((item) =>
                        <li key={item.Date} onClick={this.getDateHistory} className="list-group-item">{item.Date}</li>
                    )}
                </div> */}


            </>
        );
    }
}
export default GetPatientHistory;