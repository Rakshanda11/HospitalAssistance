import React from 'react';

class SuggestedTextBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tests:"Suggested Tests"
        }
    }
    clearInput = e => {
        this.setState({ tests: "" })
    }
    handleTest = e => {

        this.setState({ tests: e.target.value });
    };
    render(){
        return(
            <div>
               <textarea rows ="8" className="form-control"
                         value={this.state.tests}
                         onChange={this.handleTest}
                         onClick={this.clearInput}
                     />
                     <br />
            </div>
        );
    }
}
export default SuggestedTextBox;