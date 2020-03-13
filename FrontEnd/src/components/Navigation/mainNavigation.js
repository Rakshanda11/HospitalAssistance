import React from "react";
import { NavLink } from "react-router-dom";
import "./mainNavigation.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
const mainNavigation = props => (
  <header className="main-navigation">
    <nav className="main-navigation__items">
      <div className="toolbar__toggle-button">
        <DrawerToggleButton
          click={props.drawerClickHandler}
        ></DrawerToggleButton>
      </div>
      <div className="main-navigation__logo">
        <h1>CarePlus</h1>
      </div>
      <div className="main-navigation__div">
        <ul>
          <li>
            <NavLink to="/auth">Authentication</NavLink>
          </li>
          <li>
            <NavLink to="/reception">Reception</NavLink>
          </li>
          <li>
            <NavLink to="/doctor">Doctor</NavLink>
          </li>
          <li>
            <NavLink to="/lab">Lab</NavLink>
          </li>
          {/* 
            <Route path="/auth" component={AuthPage} />
              <Route path="/reception" component={Reception} />
              <Route path="/doctor" component={Doctor} />
              <Route path="/lab" component={Lab} />
          */}
        </ul>
      </div>
    </nav>
  </header>
);
export default mainNavigation;
