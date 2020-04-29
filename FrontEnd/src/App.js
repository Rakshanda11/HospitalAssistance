import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Admin from './pages/Admin/admin';
import AuthPage from "./pages/Auth/auth";
import Reception from "./pages/Reception/reception";
import Doctor from "./pages/Doctor/doctor";
import Lab from "./pages/Lab/Lab";
// import MainNavigation from "./components/Navigation/mainNavigation";
// import SideDrawer from "./components/SideDrawer/SideDrawer";
// import Backdrop from "./components/Backdrop/Backdrop";

import Crypto from 'crypto-js';

class App extends Component {

  SECRET_KEY = "12345";

  encryptUserData = (user) => {
    return Crypto.AES
      .encrypt(JSON.stringify(user),
        this.SECRET_KEY)
      .toString();
  }

  decryptUserData = (encryptedData) => {
    var bytes = Crypto.AES
      .decrypt(encryptedData,
        this.SECRET_KEY);
    return JSON.parse(bytes.toString(Crypto.enc.Utf8))
  }
  saveUserData = (userData) => {
    localStorage.setItem('session', userData)
  }

  getUserData = () => {
    return localStorage.getItem('session')
  }

  constructor(props) {
    super(props);
    var data = this.getUserData();
    if (data) {
      var existingUser = this.decryptUserData(data);
      if (existingUser) {
        this.state = {
          redirect: null,
          currentUser: existingUser,
          sideDrawerOpen: false
        };
      }
    } else 
    {
      this.state = {
        redirect: null,
        currentUser: null,
        sideDrawerOpen: false
      };
    }

  }


  updateUser = (newUser) => {
    if (newUser) {
      this.setState({
        currentUser: newUser
      }, () => {
        var encryptedUser = this.encryptUserData(newUser);
        this.saveUserData(encryptedUser);
      });
    }

    else {
      this.setState({
        currentUser: null
      });
    }
  }

  render() {
    // let backDrop;

    // if (this.state.sideDrawerOpen) {
    //   backDrop = <Backdrop click={this.backDropClickHandler}></Backdrop>;
    // }
    return (
      <BrowserRouter>
        <React.Fragment>
          {/* {this.state.navBar} */}
          {/* <SideDrawer show={this.state.sideDrawerOpen}></SideDrawer> */}
          {/* {backDrop} */}
          <main className="main_content">
            <Switch>
              <Redirect from="/" to="/auth" exact strict></Redirect>
              <Route
                path="/auth"
                component={() => <AuthPage
                  currentUser={this.state.currentUser}
                  updateUser={this.updateUser}
                >
                </AuthPage>} />
              <Route
                path="/reception"
                component={() => <Reception></Reception>}
              />
              <Route
                path="/doctor"
                component={() => <Doctor
                  currentUser={this.state.currentUser}
                  updateUser={this.updateUser}
                >
                </Doctor>} />
              <Route path="/admin" component={() => <Admin></Admin>} />
              <Route
                path="/lab"
                component={() => <Lab
                  currentUser={this.state.currentUser}
                  updateUser={this.updateUser}
                >
                </Lab>} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>

    );
  }
}
export default App;
