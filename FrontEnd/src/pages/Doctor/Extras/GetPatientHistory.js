import React from 'react';
import './GetPatientHistory.css';
class GetPatientHistory extends React.Component{
   getDateHistory = () => {
       console.log("hi");
   }
    render(){
        return(
            <>
                <h3>History</h3>
                {this.item =this.props.patient.Visits.map((item)=>
                <li key = {item.Date} onClick={this.getDateHistory} className="Decoratelist">{item.Date}</li>
                )}
                
                
            </>
        );
    }
}
export default GetPatientHistory;