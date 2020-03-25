import React from 'react';
import './GetPatientHistory.css';
class GetPatientHistory extends React.Component{
    render(){
        return(
            <>
            <form>
                <h3>History</h3>
                <div>
                    <label>BLOOD PRESSURE:
                        <textarea className ="form-control"/>
                    </label>
                    
                    <label>TEMPRATURE:
                        <textarea className ="form-control"/>
                    </label>
                </div>
                <hr/>
                <div>
                    <label>HEARTBEAT RATE:
                        <textarea className ="form-control"/>
                    </label>
                    <label>PULSERATE:
                        <textarea className ="form-control"/>
                    </label>
                </div>
                <button className="stylebutton">Add</button>
            </form>
            </>
        );
    }
}
export default GetPatientHistory;