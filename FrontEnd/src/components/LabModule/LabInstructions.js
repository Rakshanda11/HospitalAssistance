import React from 'react';
import List from './LabAssignedList';
import './LabInstructions.css';
class Instructions extends React.Component {
    render() {
        return(
            <div>
            <h3 className="headerstyling " >
                Starter's guide:
                </h3>
            <div className="borderlist infostyle">
                <ul className ="alignUl">
                    <li>Double click on patient's Name to get started.</li>
                    <li>Use submit button when Report is submitted.</li>
                    <li>If required also give the remarks.</li>
                </ul>
                
            </div>
            <List patientsList ={this.props.patientsList} updatePatient={this.props.updatePatient}/>
        </div>
        );
    }
}
export default Instructions;