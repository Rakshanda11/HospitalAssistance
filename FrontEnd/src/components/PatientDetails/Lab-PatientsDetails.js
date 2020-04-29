import React from "react";
import Upload from "./upload";
import "./Lab-PatientDetails.css";

class LabPatientDetails extends React.Component {
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
                    <p className="attribute-styling number"> {" " + this.props.patient.mob}</p>
                    <div className="spacer"></div>
                    <p className="alignDetails highlighter age">Age: </p>
                    <p className="attribute-styling age"> {" " + this.props.patient.age}</p>
                    <div className="spacer"></div>
                    <p className="alignDetails highlighter weight">Weight: </p>
                    <p className="attribute-styling weight"> {" " + this.props.patient.weight}</p>
                </div>
                <hr />
                {/* <p className="alignDetails highlighter Tests">Tests To Be Performed</p>
                <ul className="items-arrange">
                    {this.props.patient.diagnosisData.tests.map((item) => {
                        return (
                            <div className="margin-space" key={item}>

                                <div className=" accordion md-accordion " id="accordionEx" role="tablist" aria-multiselectable="true">
                                    <div className="card ">

                                        <div className="card-header" role="tab" id="headingOne1">
                                            <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
                                                aria-controls="collapseOne1">
                                                <h5 className="mb-0">
                                                    {item}
                                                </h5>
                                            </a>
                                        </div>

                                        <div id="collapseOne1" className="collapse show " role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
                                            <div className="card-body">
                                                <div className="file-loading">
                                                    <input id="input-b2" name="input-b2" type="file" className="file" data-show-preview="false"></input>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <br />
                                <br />

                            </div>
                        );
                    }
                    )}
                </ul>
                <div>
                    <button type="button" className="btn btn-danger submit">
                        Submit
                    </button>
                </div> */}
                <Upload patient={this.props.patient}></Upload>
            </div>

        );
    }
}
export default LabPatientDetails;



