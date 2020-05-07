import React from "react";
import AuthNavigation from './Navigation/mainNavigation';
import firebase from '../../firebase';
import { withRouter } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { Alert } from 'reactstrap';
import { Route, Link } from 'react-router-dom';

import "./auth.css";

class ForgotPassword extends React.Component {
  auth = firebase.auth();
  constructor(props){
    super(props);
    this.emailElementRef = React.createRef();
  }

  render() {
    return (
      <div className="forgot-page">
        <div className="img-fluid" src="Auth.jpg">
              <h2 className="greetings">Reset Your Password</h2>
              <p className="greetings-text">Enter the email associated with your account. We will send you an email with further instructions.</p>
              {<form className="auth-form" ref="form" onSubmit={(event) => {
                event.preventDefault();
                var email = this.emailElementRef.current.value;
                this.auth.sendPasswordResetEmail(email)
                  .then(() => {
                    alert("Instructions sent to your email.")
                  })
                  .catch((error) => {
                    alert(error)
                  })
              }}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control"
                    id="email"
                    ref={this.emailElementRef}
                  ></input>
                </div>
                <div className="form-action">
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                </button>
                </div>
              </form>
              }
            </div>
      </div>
    )
  }
}

class AuthPage extends React.Component {

  auth = firebase.auth();
  usersDatabaseRef = firebase.firestore().collection('Users')

  state = {
    loading: false,
    showAlert: false,
    alertText: "Error"
  }

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
          this.props.updateUser({
            name: userData.name,
            type: userData.type,
            id: newUserId
          })

          // Check its type
          if (userData.type === "Doctor") {
            // Navigate to other page
            this.props.history.push("/doctor")
          }
          else if (userData.type === "Lab Attendent") {
            this.props.history.push("/lab")
          }
          else if (userData.type === "Receptionist") {
            this.props.history.push("/reception")
          }
          else {
            console.log(userData)
          }
          // else if (userData.type ===)

        } else { // Invalid user
          this.auth.signOut();
          this.alertUser("Enter valid credentials")
        }
      })
      .catch(error => {
        this.alertUser(error.toString())
      })
  }

  componentDidMount() {
    // We need the props first before handling firebase authentication
    this.firebaseAuthListener = this.auth.onAuthStateChanged(userAuth => {
      if (userAuth && this.props.currentUser !== userAuth) { }
      else if (userAuth === null && this.props.currentUser !== null) {
        this.props.updateUser(null)
      }
    });
  }

  componentWillUnmount() {
    this.firebaseAuthListener && this.firebaseAuthListener()
  }

  alertUser = (text) => {
    this.setState({
      loading: false,
      showAlert: true,
      alertText: text,
    })
  }

  submitHandler = event => {
    this.setState({
      loading: true
    })
    if (event)
      event.preventDefault();

    const email = this.emailElementRef.current.value;
    const password = this.passwordElementRef.current.value;

    if (email.trim().length === 0) {
      this.setState({
        loading: false
      })
      this.alertUser("Incorrect Email");
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
        this.alertUser(err.toString());
        return
      })
  };

  userElement = (
    <div>
      <h1>Hello User</h1>
      <button onClick={() => {
        this.auth.signOut()
          .then(() => {
            localStorage.removeItem('session')
          })
          .catch(err => {
            this.alertUser(err.toString())
          })
      }}>Log Out</button>
    </div>
  )

  toggleAlert = () => {
    this.setState(prevState => ({
      showAlert: !prevState.showAlert
    }))
  }

  render() {
    return (
      <>
        <AuthNavigation />
        <Route
          path="/auth/forgot"
          component={() => <ForgotPassword
            currentUser={this.state.currentUser}
            updateUser={this.updateUser}
          >
          </ForgotPassword>} />
        <div className="alert-div">
          <div className="alert-container">
            <Alert variant="danger"
              isOpen={this.state.showAlert}
              toggle={this.toggleAlert}
              dissmisible
            >{this.state.alertText}</Alert>
          </div>
        </div>
        <LoadingOverlay
          active={this.state.loading}
          spinner
          text="Please wait"
        >
          {this.props.currentUser ?
            this.userElement
            :
            <div className="img-fluid" src="Auth.jpg">
              <h2 className="greetings">Welcome</h2>
              {<form className="auth-form" ref="form" onSubmit={this.submitHandler}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control"
                    id="email"
                    ref={this.emailElementRef}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    className="form-control"
                    ref={this.passwordElementRef}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        this.submitHandler();
                      }

                    }}
                  ></input>
                </div>
                <p className="forgot-password text-right">
                  Forgot <Link to={`/auth/forgot`}>password?</Link>
                </p>
                <div className="form-action">
                  <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                </div>
              </form>
              }
            </div>
          }
        </LoadingOverlay>
      </>

    );
  }
}

export default withRouter(AuthPage);
