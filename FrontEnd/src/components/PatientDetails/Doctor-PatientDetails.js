import React from 'react';
// import  Item  from 'react-bootstrap/lib/Breadcrumb'; 
import './Doctor-PatientDetails.css';
class Doctor_PatientDetails extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="alignetails">
                <br/>
                <span className ="styling-details">Name : <div className="attribute-styling"> {this.props.detail.name}</div></span>
                <br/>
                <span className ="styling-details">Age : <div className="attribute-styling"> {this.props.detail.age}</div></span>
               
            </div>
        );
    }

}
export default Doctor_PatientDetails;