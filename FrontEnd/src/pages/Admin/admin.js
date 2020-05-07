// Make a form to create a user with their name and email and password

import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import './admin.css';

class Admin extends React.Component {
    databaseRef = firebase.firestore();
    usersDataRef = this.databaseRef.collection("Users");
    auth = firebase.auth();

    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.userTypeRef = React.createRef();
        this.secretKeyRef = React.createRef();
        this.mobileRef = React.createRef();
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        var name = this.nameRef.value
        var email = this.emailRef.value
        var password = this.passwordRef.value
        var userType = this.userTypeRef.value
        var secretKey = this.secretKeyRef.value
        var mobileNumber = this.mobileRef.value;

        if (secretKey !== "12345"){
            alert("Wrong Secret key")
            return
        }

        if (mobileNumber.length !== 10){
            alert("Mobile Number should be 10 digits");
            return;
        }

        // First create an user with Email and Password
        this.auth.createUserWithEmailAndPassword(email, password)
            .then((newUser) => {
                console.log()
                // After successfully creating user, add the name and type of user under user ID
                return this.usersDataRef.doc(newUser.user.uid).set({
                    "name": name,
                    "email": email,
                    "type": userType,
                    "mob": mobileNumber
                })
            })
            .then(() => {
                alert("ADDED SUCCESSFULLY")
            })
            .catch(error => {
                alert(error)
            })

    }

    userSignUpForm = (
        <div>
            <form className="auth-form" onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="name"
                        ref={input => this.nameRef = input}
                    ></input>
                </div>
                
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                        required
                        type="email"
                        className="form-control"
                        id="email"
                        ref={input => this.emailRef = input}
                    ></input>
                </div>
                
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        required
                        type="password"
                        id="password"
                        className="form-control"
                        ref={input => this.passwordRef = input}
                    ></input>
                </div>
                
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Mobile Number</label>
                    <input
                        required
                        type="number"
                        id="number"
                        className="form-control"
                        ref={input => this.mobileRef = input}
                    ></input>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Admin Secret Key</label>
                    <input
                        required
                        type="password"
                        id="secret-key"
                        className="form-control"
                        ref={input => this.secretKeyRef = input}
                    ></input>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Type of User</label>
                    <select
                        required
                        className="form-control"
                        id="doctorselected"
                        name="doctorselected"
                        ref={select => this.userTypeRef = select}
                        defaultValue=""
                    >
                        <option value="" disabled>Select</option>
                        <option>Receptionist</option>
                        <option>Doctor</option>
                        <option>Lab Attendent</option>
                        <option>Patient</option>
                    </select>
                </div>

                <div className="form-action">
                    <button type="submit" className="btn btn-primary">
                        Submit
                </button>
                </div>
            </form>
        </div>
    )

    render() {
        return (
            <>
                <div className="form-heading">
                    <h1>Register the User</h1>
                </div>
                {this.userSignUpForm}
            </>
        );
    }

}


export default withRouter(Admin)