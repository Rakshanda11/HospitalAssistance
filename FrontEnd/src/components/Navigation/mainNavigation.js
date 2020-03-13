import React from "react";
import { NavLink } from "react-router-dom";

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import "./MainNavigation.css";

const mainNavigation = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler}></DrawerToggleButton>
      </div>
      <div className="toolbar__logo">
        <a href="/">THE LOGO</a>
      </div>
      <div className="spacer"></div>
      <div className="toolbar__navigation-items">
        <ul>
          <li>
            {/* <a href="/">Products</a> */}
            <NavLink to="/reception">Reception</NavLink>
          </li>
          <li>
            {/* <a href="/">Users</a> */}
            <NavLink to="/doctors">Doctors</NavLink>
          </li>
          <li>
            {/* <a href="/">Users</a> */}
            <NavLink to="/auth">Auth</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default mainNavigation;
