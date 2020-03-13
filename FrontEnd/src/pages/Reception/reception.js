import React, { Component } from 'react';
import './reception.css';
import Patiententry from '../../components/patiententry/patiententry';
import Patientlist from '../../components/patientlist/patientlist';
// import Pd from '../component/patiententry/pd';
import PopUp from '../../components/patientlist/popUp';

class Receptionpage extends Component {
    constructor(props){
        super(props);
        this.state = {
            patientList: []
        }
    }
    updateList = (patient) => {
        var tempArray = this.state.patientList;
        // tempArray.push({
        //     name: patient.name,
        //     age: patient.age,
        //     hieght: patient.hieght,
        //     weight: patient.weight,
        //     adharid: patient.adharid,
        //     address: patient.address
        
        // });
        if (patient.name)
            tempArray.push({...patient})
        this.setState({
            patientList: tempArray.slice()
        });
        console.log(this.state.patientList);
    }
    render() {
        return (
            <div className="Container">
                <div className="row">
                    <React.Fragment >
                        <div className="col-sm-4 " >
                            <Patiententry updateFunction = {this.updateList}/>
                        </div>
                        <div className="col-sm-4">
                            <Patientlist list={this.state.patientList}/>
                        </div>
                        {/* <div className="col-sm-4">
                            <Patientlist />
                        </div> */}
                        
                    </React.Fragment>
                </div>
            </div>
        );
    }
}

export default Receptionpage;