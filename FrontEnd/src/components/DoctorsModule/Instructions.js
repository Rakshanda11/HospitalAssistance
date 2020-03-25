import React from 'react';
import List from './AssignedList';
import './Instructions.css';
class Instructions extends React.Component {
    render() {
        return(
            <div>
            <h3 className="headerstyling " >
                Starter's guide:
                </h3>
            <div className="borderlist infostyle">
                <ul className ="alignUl">
                    <li>Get started by clicking on patient name.</li>
                    <li>Use submit button when diagnosis is done.</li>
                    <li>Check the patient's past medical history by selecting the date which you want to check.</li>
                </ul>
                
            </div>
            <List patientsList ={this.props.patientsList} updatePatient={this.props.updatePatient}/>
        </div>
        );
    }
}
export default Instructions;