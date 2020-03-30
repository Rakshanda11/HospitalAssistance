import React from "react";
import SuggestedTextBox from "./suggestedTest";

class SuggestTest extends React.Component {
  state = {
    testRequired: false
  };
  setTrue = () => {
    this.setState({ testRequired: true });
    console.log(this.state.testRequired);
  };
  setFalse = () => {
    this.setState({ testRequired: false });
    console.log(this.state.testRequired);
  };

  render() {
    let testrequired;
    if (this.state.testRequired) {
      testrequired = <SuggestedTextBox />;
    }
    return (
      <div className="custom-control custom-radio">
        <p>Any Test Required?</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.setTrue}
        >
          YES
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.setFalse}
        >
          NO
        </button>
        <br />
        <br />
        {testrequired}
        {/* <Submit onClick={()=>{
                    console.log("In submit");
                    //this.funref();
                }}/> */}
        <button type="button" className="btn btn-dark">
          Submit
        </button>
      </div>
    );
  }
}
export default SuggestTest;
