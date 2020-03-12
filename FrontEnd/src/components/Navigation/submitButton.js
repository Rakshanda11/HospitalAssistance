import React from 'react';

class Submit extends React.Component{
    render(){
        return(
            <div>
                <button type="button" className="btn btn-dark" onClick={this.setFalse}>Submit</button>
            </div>
        );
    }
}
export default Submit;