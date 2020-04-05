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
            {/* <a href="/">Users</a> */}
            <NavLink to="/auth">Log Out</NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default sideDrawer;
