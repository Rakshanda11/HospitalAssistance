import React from 'react';

class Prescription extends React.Component {
    state = {
        medicines: "Enter The Prescription"
    }
    handleMedicine = e => {

        this.setState({ medicines: e.target.value });
    };
    clearInput = e => {
        this.setState({ medicines: "" })
    }
    render() {
        return (
            <div>
                <br/>
                <textarea rows ="8" className="form-control" 
                    value={this.state.medicines}
                    onChange={this.handleMedicine}
                    onClick={this.clearInput}
                />
                <br />
            </div>
            
        );
    }
}
export default Prescription;