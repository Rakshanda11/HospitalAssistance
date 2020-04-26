import React from 'react';
import './Ppage.css';

export default function Ppage({ current_p }) {
    console.log('welcome to pppage');
    console.log(current_p)
    return (
        <div className="ppCard">
            <div>
                {/* <div className="bar"><p className="ttl">Prescription Id :{current_p.PatientId}</p></div>  */}
                <hr className="hr1" ></hr>
               <div className="col-lg-12 col-md-12 col-12 align-basic">
               <div className="container1">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-12 " >
                            <p className="basic">Weight :</p>
                            <p>  {current_p.weight}</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                            <p className="basic">Temperature :</p>
                            <p> {current_p.Temperature}</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                            <p className="basic">Pulse Rate : </p>
                            <p>{current_p.pr}</p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                            <p className="basic">SPO2 : </p>
                            <p>{current_p.sp}</p>
                        </div>
                    </div>

                </div>
               </div>
                <div class="row1">
                    <div class="col-lg-6 col-md-6 col-12">
                        <div class=" symp card .bg-#A4FFD5 z-depth-1" >
                            <div class="card-body">
                                <h4 class="card-title " className="sym">Symptoms</h4>
                                <hr className="hrr1"></hr>
                                <p>This is a sym This is a sym This is a symThis is a sym This is a sym This is a sym This is a sym This is a sym vv This is a sym</p>
                                {/* <p>{current_p.symptoms}</p> */}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12 wid">
                        <div class="card .bg-secondary z-depth-1" >
                            <div class="card-body ">
                                <h4 class="card-title " className="sym">Remarks</h4>
                                <hr className="hrr1"></hr>
                                <p>This is a sym This is a sym This is a symThis is a sym This is a sym This is a sym This is a sym This is a sym vv This is a sym</p>
                                {/* <p >{current_p.drRemark}</p> */}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12 digno">
                    <div className="card z-depth-1 ekPu ">
                        <div className="card-content black-text text-darken-3 " >
                            <h4 className="dia">Diagnosis </h4>
                            <hr className="hrr1"></hr>
                            <p>This is a sym This is a sym This is a symThis is a sym This is a sym This is a sym This is a sym This is a sym vv This is a sym</p>
                            {/* <p>{current_p.diagnosis}</p> */}
                        </div>

                    </div>

                </div>
                <div className="drug col-lg-12 col-md-12 col-12 digno">
                    <div className="card z-depth-1 ekPd ">
                        <div className="card-content black-text text-darken-3">
                            <h4 className="dia">Drugs </h4>
                            <hr className="hrr1"></hr>
                            <p>This is a sym This is a sym This is a symThis is a sym This is a sym This is a sym This is a sym This is a sym vv This is a sym</p>
                            {/* <p>{current_p.drugs}</p> */}
                            <p>Lorem ipsum, or </p>
                            <p>Lorem ipsum, or </p>
                            <p>Lorem ipsum, or </p>


                        </div>

                    </div>

                </div>
            </div>

        </div>


    );
}
