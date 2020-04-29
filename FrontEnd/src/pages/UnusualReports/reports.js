import React from 'react';
import firebase from '../../firebase';

import './reports.css';

class Reports extends React.Component {
    reportsDataRef = firebase.firestore().collection("Unusual Reports");

    isUpdated = false

    state = {
        downloaded: false,
        reports: []
    }

    // createTable = (
        
    // )

    render() {

        if (!(this.isUpdated)){
            this.isUpdated = true;
            this.reportsDataRef
            .get()
            .then((dataSnapshot) => {
                var tempList = []
                dataSnapshot.forEach((eachReport) => {
                    tempList.push(eachReport.data())
                })
                this.setState({
                    reports: tempList,
                    downloaded: true
                }, ()=> {
                    console.log(this.state.reports)
                    
                })
                
            })
            .catch((error) => {
                console.log(error)
            })
        }

        return (<div className="reports-div">
            <h2>List of Unusual Reports</h2>
            <br/>
            <p>These reports are anonymous and are
                submitted by the doctors with concents from their patients</p>
            <p>This data is open source and is available for entities
            in need of such data.
            </p>
            {
                this.state.downloaded
                    ? // Render a table using the reports data
                    <div>
                        <table className="table table-hover table-bordered" style={{tableLayout: "fixed"}}>
                            <thead>
                                <tr>
                                    <th scope="col">Number</th>
                                    <th scope="col">Type of Test</th>
                                    <th scope="col">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reports.map((eachReport, index) => {
                                    console.log(eachReport)
                                    return <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{eachReport.testName}</td>
                                        <td className="link-element" style={{overflowX: "hidden", overflowY:"scroll"}}>
                                            <div className="link-element" style={{height: "1rem"}}>
                                                <a href={eachReport.reportURL} target="_blank">Click here</a>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <a className="btn btn-success"
                        href={"data:" 
                                + "text/json;charset=utf-8," 
                                + encodeURIComponent(JSON.stringify(this.state.reports))
                                + " "
                            } 
                        download="reports.json"
                        target="_blank"
                    >Download All</a>
                    </div>
                    : <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    
            }
            
        </div>)
    }
}

export default Reports;