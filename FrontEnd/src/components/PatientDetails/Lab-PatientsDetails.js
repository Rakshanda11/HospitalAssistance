import React from "react";
import "./Lab-PatientDetails.css";
class Lab_PatientDetails extends React.Component {
    render() {
        return (
            <div className="align-details">
                <div className="styling-details row1">
                    <p className="highlighter aligndetails name">Name: </p>
                    <p className="attribute-styling name"> {" " + this.props.patient.name}</p>
                    <div className="spacer"></div>
                    <p className="rightalign highlighter pid">Patient ID: </p>
                    <p className="attribute-styling pid"> {" " + this.props.patient.PatientId}</p>
                </div>
                <div className="styling-details">

                </div>
                <div className="styling-details row2">
                    <p className="highlighter aligndetails number">Contact No: </p>
                    <p className="attribute-styling number"> {" " + this.props.patient.phoneNo}</p>
                    <div className="spacer"></div>
                    <p className="alignDetails highlighter age">Age: </p>
                    <p className="attribute-styling age"> {" " + this.props.patient.age}</p>
                    <div className="spacer"></div>
                    <p className="alignDetails highlighter weight">Weight: </p>
                    <p className="attribute-styling weight"> {" " + this.props.patient.weight}</p>
                </div>
                <p className="alignDetails highlighter Tests">Tests To Be Performed:</p>
                    <ul >
                    { this.props.patient.Tests.map((item) =>
                        {
                            return (
                                <div >
                                    <div className="button-xlarge" key={item.Tests}  >{item}</div>
                                    <br/><br/>
                                    
                                </div>
                            );
                        }
                    )}
                    </ul>
                <div>
                </div>

            </div>
        );
    }
}
export default Lab_PatientDetails;
