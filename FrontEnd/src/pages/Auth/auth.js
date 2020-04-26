import React from "react";
import AuthNavigation from './Navigation/mainNavigation';
import firebase from '../../firebase';
import { withRouter } from 'react-router-dom';

import "./auth.css";

class AuthPage extends React.Component {
  auth = firebase.auth();
  usersDatabaseRef = firebase.firestore().collection('Users')

  constructor(props) {
    super(props);
    this.emailElementRef = React.createRef();
    this.passwordElementRef = React.createRef();
  }

  checkAndNavigate = (newUserId) => {
    // First check if this user exists in the database
    // and get its User-Type

    this.usersDatabaseRef.doc(newUserId)
      .get()
      .then((snapShot) => {
        // We got the user snapshot
        var userData = snapShot.data()

        // If the user is a valid user
        if (userData) {
          // Add this to parent state
          this.props.updateUser(newUserId)

          // Check its type
          if (userData.type === "Doctor") {
            // Navigate to other page
            this.props.history.push("/doctor")
          }
          else if (userData.type === "Lab Attendent") {
            this.props.history.push("/lab")
          }
          else {
            console.log(userData)
          }
          // else if (userData.type ===)

        } else { // Invalid user
          this.auth.signOut();
          alert("Enter valid credentials")
        }
      })
      .catch(error => {
        alert("Error")
      })
  }

  componentWillMount() {
    // We need the props first before handling firebase authentication
    this.auth.onAuthStateChanged(userAuth => {
      if (userAuth && this.props.currentUser != userAuth) { }
      else if (userAuth === null && this.props.currentUser !== null) {
        this.props.updateUser(null)
      }
    });
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailElementRef.current.value;
    const password = this.passwordElementRef.current.value;

    if (email.trim().length === 0) {
      alert("Incorrect Email");
      return;
    }

    // Try to log in
    this.auth.signInWithEmailAndPassword(email, password)
      .then((newUser) => {

        this.checkAndNavigate(newUser.user.uid)
        console.log("SIGN IN SUCCESSFUL")
      })
      .catch(err => {
        // Error while logging in
        alert(err);
        return
      })
  };

  userElement = (
    <div>
      <h1>Hello User</h1>
      <button onClick={() => {
        this.auth.signOut()
          .catch(err => {
            console.log(err)
          })
      }}>Log Out</button>
    </div>
  )

  render() {
    return (
      <>
        <AuthNavigation />
        {this.props.currentUser ?
          this.userElement
          :
          <div className="img-fluid" src="Auth.jpg">
            <h2 className="greetings">Welcome</h2>
            {<form className="auth-form" onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  ref={this.emailElementRef}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  ref={this.passwordElementRef}
                ></input>
              </div>

              <div className="form-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
            }
          </div>
        }
      </>

    );
  }
}

export default withRouter(AuthPage);
