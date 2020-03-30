import React from "react";
import "./DoctorDiagnosis.css";

class Prescription extends React.Component {
  render() {
    return (
      <>
        <h3>New Diagnosis</h3>
        <form ref="form" onSubmit={(event) => {
          event.preventDefault();
          console.log("HELLO")
        }}>
          <div className="control-group">
            <div className="controls form-inline basics-row">
              <label htmlFor="inputKey">Blood Pressure: </label>
              <input type="text" className="input-small" placeholder="mmHg" />

              <div className="spacer"></div>

              <label htmlFor="inputValue">Temperature: </label>
              <input
                type="password"
                className="input-small"
                placeholder={"\u2109"}
              />
            </div>
          </div>

          <hr />

          <div className="control-group">
            <div className="controls form-inline basics-row">
              <label htmlFor="inputKey">Pulse Rate:</label>
              <input
                type="text"
                className="input-small"
                placeholder="per min"
              />
            </div>
          </div>

          <hr />

          <div className="paper">
            <textarea
              className="text-area"
              placeholder="Enter further diagnosis (If Any)"
              id="text"
              name="text"
              rows="4"
            ></textarea>
            <br />
          </div>
          
          <br />

          <div className="box-1">
            {/* <div className="btn btn-one"> */}
              <button className="btn btn-one submit-button" type="submit">
                Submit
              </button>
            {/* </div> */}
          </div>
          {/* <button onClick={() => {console.log("DOSF")}}>HDJF</button> */}
          
          <br />
          <br />
        
        </form>
      </>
    );
  }
}
export default Prescription;
