import React from "react";
import { NavLink } from 'react-router-dom'
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import "./mainNavigation.css";
class mainNavigation extends React.Component {

  state = {
    show: false
  }

  showDropdownMenu = () =>  {
    this.setState({ show: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu = () =>  {
    this.setState({ show: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {
    // console.log(this.props)
    return (
      <header className="doctor-main-navigation">
        <nav className="main-navigation__items">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton
              click={this.props.drawerClickHandler}
            ></DrawerToggleButton>
          </div>
          <div className="main-navigation__logo">
            <h1>Care Plus</h1>
          </div>
          <div className="spacer"></div>
          <div className="main-navigation__div">
            <ul>
              <li>
                <button
                  type="button"
                  className="btn"
                  onClick={this.props.history}
                >
                  Patient History
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn"
                  onClick={this.props.diagnosis}
                >
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

              {/* <li> */}

              {/* <NavLink 
                    className="btn btn-logout" 
                    to="/auth"
                  ><span>{<AccountBoxIcon/>} {this.props.doctorName}</span></NavLink> */}

              {/* </li> */}

            </ul>
            <div className="user-dropdown">
              <button type="button" className="btn" onClick={() => {
                this.setState(prevState => ({
                  show: !prevState.show
                }))
                this.showDropdownMenu();
              }}>
                <span className="user-header">
                  {<FaceIcon />} {this.props.doctorName}</span>
              </button>
              {this.state.show
                ?
                <ul className="options">
                  <li className="option-item"><button className="btn btn-option"><span className="user-header">
                    {<AccountBoxIcon />} Profile</span></button></li>
                  <li><NavLink
                    className="btn btn-logout"
                    to="/auth"
                  ><span>{<ExitToAppIcon />} LogOut</span></NavLink></li>
                </ul>
                : null}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
export default mainNavigation;
