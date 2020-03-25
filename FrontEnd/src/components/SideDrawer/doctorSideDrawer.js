import React from "react";
import { NavLink } from "react-router-dom";

import "./SideDrawer.css";

class sideDrawer extends React.Component{
  render(){
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }
    return (
      <nav className={drawerClasses}>
        <ul>
          <li>
            <button type="button" className="btn" onClick={this.props.history}>
              Patient History
            </button>
          </li>
          <li>
            <button type="button" className="btn" onClick={this.props.diagnosis}>
              Diagnosis
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn"
              onClick={this.props.prescription}
            >
              Prescription
            </button>
          </li>
          <li>
            {/* <a href="/">Users</a> */}
            <NavLink to="/auth">Log Out</NavLink>
          </li>
        </ul>
      </nav>
    );
  };
}

export default sideDrawer;
