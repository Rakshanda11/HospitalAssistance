import React from 'react';
import './GetPatientHistory.css';
import HistoryList from './HistoryList';
import Ppage from './Ppage';
import { Card } from 'reactstrap';
class GetPatientHistory extends React.Component {
    // date = null;
    state = {
        entry: null
    }
    getDateHistory = (date, diagnosisData) => {
        var obj = {
            "date": date,
            "diagnosisData": diagnosisData
        }
        this.setState({
            entry: obj
        })
    }
    render() {
        console.log("Visits:")
        console.log(this.props.visits)
        return (
            <>
                <Card>
                    {
                        <HistoryList 
                            historyList={this.props.visits} 
                            getDateHistory = {this.getDateHistory}/>
         
                    }
                    <hr className="hrhis"></hr>
                   {
                       this.state.entry?<Ppage 
                        current_p={this.props.patient} entry={this.state.entry}/>:null
                   }
                   
                </Card>



            </>
        );
    }
}
export default GetPatientHistory;