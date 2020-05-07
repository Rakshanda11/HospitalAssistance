import React from "react";
import firebase from "../../firebase";

class TestUpload extends React.Component {
    today = (new Date()).toDateString();

    databaseRef = firebase.firestore();
    investigatedQueueRef = this.databaseRef.collection("Everyday-Patients")
        .doc(this.today)
        .collection("Investigated");
    labQueueRef = this.databaseRef.collection("Everyday-Patients")
        .doc(this.today)
        .collection("Lab")
    storageRef = firebase.storage().ref("Testing Department");

    constructor(props) {
        super(props)
        this.state = {
            uploading: false,
            file: null,
            uploadProgress: 0,
            uploadComplete: false
        }
        this.allInputs = [];
        this.currentPatient = null;
        this.completedTestsURLs = [];
    }

    handleUpload = () => {
        this.setState({
            uploading: true
        })
        this.allInputs.map((inputData, index) => {
            var file = inputData.file;
            this.setState({
                file: file.name
            })
            const imageUpload = this.storageRef.child(file.name).put(file);
            imageUpload.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({
                        uploadProgress: progress
                    });
                },
                (err) => {
                    console.log(err)
                },
                () => { // After completion
                    this.storageRef.child(file.name)
                        .getDownloadURL()
                        .then((url) => {
                            this.completedTestsURLs.push({
                                test: inputData.test,
                                url: url
                            })
                            if (index === this.allInputs.length - 1) {
                                // All files uploaded
                                this.setState({
                                    uploadComplete: true,
                                    uploading: false
                                })
                                this.currentPatient.diagnosisData["completedTests"] = this.completedTestsURLs

                                // This patient is ready to be sent back to the doctor
                                this.investigatedQueueRef.doc(this.currentPatient.adhaarid).set(this.currentPatient);

                                // Remove this patient from lab
                                this.labQueueRef
                                    .where("adhaarid", "==", this.currentPatient.adhaarid)
                                    .get()
                                    .then((patientDocs) => {
                                        patientDocs.forEach((eachDoc) => {
                                            eachDoc.ref.delete();
                                        })
                                        alert("Successfull")
                                        // Reset patient details section
                                        this.props.patientDone();
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                            
                        })
                    
                })
            return index    // Doesn't do anything
        })
        // const image = this.storageRef.child(file.name);
        // image.put(file)
        //     .then((snapshot) => {
        //         image.getDownloadURL().then((url) => {
        //             console.log(url);
        //         })
        //     })
    }

    render() {
        this.currentPatient = this.props.patient;
        return (
            <div>
                <p className="alignDetails highlighter Tests">Tests To Be Performed</p>
                <ul className="items-arrange">
                    {this.currentPatient.diagnosisData.tests.map((item) => {
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
                                                    <input
                                                        id="input-b2"
                                                        name="input-b2"
                                                        type="file"
                                                        onChange={(event) => {
                                                            this.allInputs.push({
                                                                test: item,
                                                                file: event.target.files[0]
                                                            })
                                                        }}
                                                        className="file"
                                                        data-show-preview="false"></input>
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
                    <button type="button" onClick={this.handleUpload} className="btn btn-danger submit">
                        Submit
                    </button>
                </div>
                {
                    this.state.uploading
                        ?
                        <>
                            <br />
                            <div className="progress-section">
                                <p>Current File: {this.state.file}</p>
                                <br />
                                <progress value={this.state.uploadProgress} max="100"></progress>
                            </div>
                        </>
                        :
                        this.state.uploadComplete
                            ?
                            <h3>
                                Complete
                            </h3>
                            :
                            null}
            </div>
        )
    }
}

export default TestUpload;