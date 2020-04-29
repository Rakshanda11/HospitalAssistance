import React from "react";
import { NavLink } from "react-router-dom";
import "./mainNavigation.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class mainNavigation extends React.Component {
  render() {
    // console.log(this.props)
    return (
      <header className="main-navigation">
        <nav className="main-navigation__items">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton
              click={this.props.drawerClickHandler}
            ></DrawerToggleButton>
          </div>
          <div className="main-navigation__logo">
            <h1>CarePlus</h1>
          </div>
          <div className="spacer"></div>
          <div className="main-navigation__div">
            <ul>
              
              <li className="dropdown">
                <NavLink 
                    className="btn btn-logout" 
                    to="/auth"
                  ><span>{<AccountBoxIcon/>} {this.props.name}</span></NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
export default mainNavigation;
