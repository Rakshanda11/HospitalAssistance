import React from "react";
import AuthNavigation from './Navigation/mainNavigation';
import "./auth.css";

class AuthPage extends React.Component {
  state = {
    isLogIn: true
  };

  constructor(props) {
    super(props);
    this.emailElementRef = React.createRef();
    this.passwordElementRef = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogIn: !prevState.isLogIn };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailElementRef.current.value;
    const password = this.passwordElementRef.current.value;

    if (email.trim().length === 0) {
      alert("Incorrect Email");
      return;
    }
    console.log(email);
    console.log(password);
  };

  render() {
    return (
      <>
        <AuthNavigation />
        <div className="img-fluid" src="Auth.jpg">
          <h2 className="greetings">Welcome</h2>
          <form className="auth-form" onSubmit={this.submitHandler}>
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.switchModeHandler}
              >
                Switch to {this.state.isLogIn ? "SignUp" : "LogIn"}
              </button>
            </div>
          </form>
        </div></>
    );
  }
}

export default AuthPage;
