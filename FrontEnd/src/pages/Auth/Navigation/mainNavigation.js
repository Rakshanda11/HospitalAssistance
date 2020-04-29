import React from "react";
import "./mainNavigation.css";
// import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

class mainNavigation extends React.Component{
  render(){
    return (
      <header className="main-navigation">
        <nav className="main-navigation__items">
          <div className="main-navigation__logo">
            <h1>CarePlus</h1>
          </div>
          <div className="spacer"></div>
        </nav>
      </header>
    );
  }
} 
export default mainNavigation;
