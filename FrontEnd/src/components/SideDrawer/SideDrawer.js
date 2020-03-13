import React from "react";
import {NavLink} from 'react-router-dom';

import "./SideDrawer.css";

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show){
        drawerClasses = 'side-drawer open';
    }
  return (
    <nav className={drawerClasses}>
      <ul>
          <li>
            {/* <a href="/">Products</a> */}
            <NavLink to="/reception">Reception</NavLink>
          </li>
          <li>
            {/* <a href="/">Users</a> */}
            <NavLink to="/doctor">Doctors</NavLink>
          </li>
          <li>
            {/* <a href="/">Users</a> */}
            <NavLink to="/auth">Auth</NavLink>
          </li>
          <li>
            {/* <a href="/">Users</a> */}
            <NavLink to="/lab">Lab</NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default sideDrawer;
