import React from 'react';
import './Ppage.css';

class Ppage extends React.Component {
    render() {
        console.log('welcome to pppage');
        var current_p = this.props.current_p
        console.log(current_p)
        return (
            <div className="ppCard">
                <div>
                    {/* <div className="bar"><p className="ttl">Prescription Id :{current_p.PatientId}</p></div>  */}
                    <hr className="hr1" ></hr>
                    <div className="col-lg-12 col-md-12 col-12 align-basic">
                        <div className="container1">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-12 " >
                                    <p className="basic">Weight :</p>
                                    <p>  {current_p.weight}</p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-12">
                                    <p className="basic">Temperature :</p>
                                    <p> {this.props.entry["diagnosisData"]["temperature"]}</p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-12">
                                    <p className="basic">Pulse Rate : </p>
                                    <p>{this.props.entry["diagnosisData"]["pulseRate"]}</p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-12">
                                    <p className="basic">SPO2 : </p>
                                    <p>{this.props.entry["diagnosisData"]["spo2"]}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="new-row1">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className=" symp card .bg-#A4FFD5 z-depth-1" >
                                <div className="card-body">
                                    <h4 className="card-title sym">Symptoms</h4>
                                    <hr className="hrr1"></hr>
                                    <p>{this.props.entry["diagnosisData"]["symptoms"]}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 wid">
                            <div className="card .bg-secondary z-depth-1" >
                                <div className="card-body ">
                                    <h4 className="card-title sym">Remarks</h4>
                                    <hr className="hrr1"></hr>
                                    <p >{this.props.entry["diagnosisData"]["Remarks"]}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12 digno">
                        <div className="card z-depth-1 ekPu ">
                            <div className="card-content black-text text-darken-3 " >
                                <h4 className="dia">Diagnosis </h4>
                                <hr className="hrr1"></hr>
                                <p>{this.props.entry["diagnosisData"]["Diagnosis"]}</p>
                            </div>

                        </div>

                    </div>
                    {/* <div className="drug col-lg-12 col-md-12 col-12 digno">
                        <div className="card z-depth-1 ekPd ">
                            <div className="card-content black-text text-darken-3">
                                <h4 className="dia">Drugs </h4>
                                <hr className="hrr1"></hr>
                                <p>Lorem ipsum, or </p>
                                <p>Lorem ipsum, or </p>
                                <p>Lorem ipsum, or </p>


                            </div>

                        </div>

                    </div> */}
                </div>

            </div>


        );
    }

}

export default Ppage;
