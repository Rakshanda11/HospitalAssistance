import React from "react";
import { NavLink } from "react-router-dom";
import "./mainNavigation.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
      <header className="main-navigation-lab">
        <nav className="main-navigation__items-lab">
          <div className="toolbar__toggle-button-lab">
            <DrawerToggleButton
              click={this.props.drawerClickHandler}
            ></DrawerToggleButton>
          </div>
          <div className="main-navigation__logo-lab">
            <h1>CarePlus</h1>
          </div>
          <div className="spacer"></div>
          <div className="main-navigation__div-lab">
          <div className="user-dropdown">
              <button type="button" className="btn" onClick={() => {
                this.setState(prevState => ({
                  show: !prevState.show
                }))
                this.showDropdownMenu();
              }}>
                <span className="user-header">
                  {<FaceIcon />} {this.props.name}</span>
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
