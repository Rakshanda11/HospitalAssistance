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
import Test from './test';

import TestApp from "./pages/firebasePage";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      currentUser: null,
      sideDrawerOpen: false
    };
  }

  // drawerToggleClickHandler = () => {
  //   this.setState(prevState => {
  //     return { sideDrawerOpen: !prevState.sideDrawerOpen };
  //   });
  // };

  // backDropClickHandler = () => {
  //   this.setState({ sideDrawerOpen: false });
  // };

  updateUser = (newUser) => {
    if (newUser) {
      console.log("EMAIL:")
      console.log(newUser.email);
      this.setState({
        currentUser: newUser
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
              <Route path="/lab" component={() => <Lab></Lab>} />
              <Route path="/firebase" component={() => <TestApp></TestApp>}></Route>
              <Route path="/test" component={() => <Test></Test>}></Route>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>

    );
  }
}
export default App;
