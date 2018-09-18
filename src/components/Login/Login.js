//Imports
import React, { Component } from 'react';

import './Login.css'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={

            //toggle register/login

            isLoginVisible: true,
            isResgisterVisible: false,

            //register fields

            firstNameInput: "",
            lastNameInput: "",
            emailAddressInput: "",
            passwordInput: "",
            zipCodeInput: "",

            //login fields

            loginEmailAddressInput: "",
            loginPasswordInput: ""

        }
    }

    loginToggler = () => {
        this.setState({
            isLoginVisible: true,
            isResgisterVisible: false,
        })
    }

    registerToggler = () => {
        this.setState({
            isLoginVisible: false,
            isResgisterVisible: true,
        })
    }

    handleLoginEmailChange = (e) => {
            this.setState({
                loginEmailAddressInput: e.target.value
            })
    }

    handleLoginPasswordChange = (e) => {
        this.setState({
            loginPasswordInput: e.target.value
        })
    }

    handleFirstName= (e) => {
        this.setState({
            firstNameInput: e.target.value
        })
    }
    handleLastName= (e) => {
        this.setState({
            lastNameInput: e.target.value
        })
    }
    handleEmailInput= (e) => {
        this.setState({
            emailAddressInput: e.target.value
        })
    }
    handlePasswordInput= (e) => {
        this.setState({
            passwordInput: e.target.value
        })
    }
    handleZipcodeInput= (e) => {
        this.setState({
            zipCodeInput: e.target.value
        })
    }

    handleRegisterSubmit = (e) => {
        e.preventDefault();
        // axios
        this.setState({
            firstNameInput: "",
            lastNameInput: "",
            emailAddressInput: "",
            passwordInput: "",
            zipCodeInput: "",
        })
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        // axios
        this.setState({
            loginEmailAddressInput: "",
            loginPasswordInput: ""
        })
    }

    render(){
        return(
            <div className="background">
                <div className="background-cover">
                    <div className="content-container">

                        <h1>Welcome to Planner</h1>
                        <h3>Please Log In</h3>
                        <div className="button-wrapper">
                            <button onClick={this.registerToggler}className="login-register-button">REGISTER</button>
                            <div className="button-spacer"></div>
                            <button onClick={this.loginToggler} className="login-login-button">LOG IN</button>
                        </div>

                        {this.state.isLoginVisible && 
                        <div className="login-form-container">
                        <div style={{height: "20px"}}></div>
                            <div className="login-field-wrapper">
                                <p>USERNAME:</p>
                                <div className="button-spacer"></div>
                                <input type="text" onChange={this.handleLoginEmailChange} placeholder="username" className="login-input"></input>
                            </div>
                            <div className="login-field-wrapper">
                                <p>PASSWORD:</p>
                                <div className="button-spacer"></div>
                                <input type="text" onChange={this.handleLoginPasswordChange} placeholder="password" className="login-input"></input>
                            </div>
                            <button onClick={this.handleLoginSubmit} className="login-login-button">Submit</button>
                        </div>}

                        {this.state.isResgisterVisible &&
                        <div className="login-form-container">
                        <div style={{height: "20px"}}></div>
                            <div className="login-field-wrapper">
                                <p>FIRST NAME:</p>
                                <div className="button-spacer"></div>
                                <input type="text" onChange={this.handleFirstName} placeholder="first name" className="login-input"></input>
                            </div>
                            <div className="login-field-wrapper">
                                <p>LAST NAME:</p>
                                <div className="button-spacer"></div>
                                <input type="text" onChange={this.handleLastName} placeholder="last name" className="login-input"></input>
                            </div>
                            <div className="login-field-wrapper">
                                <p>EMAIL:</p>
                                <div className="button-spacer"></div>
                                <input type="text" onChange={this.handleEmailInput}  placeholder="email" className="login-input"></input>
                            </div>
                            <div className="login-field-wrapper">
                                <p>PASSWORD:</p>
                                <div className="button-spacer"></div>
                                <input type="text" onChange={this.handlePasswordInput}  placeholder="password" className="login-input"></input>
                            </div>
                            <div className="login-field-wrapper">
                                <p>ZIP CODE:</p>
                                <div className="button-spacer"></div>
                                <input type="text" onChange={this.handleZipcodeInput}  placeholder="zip code" className="login-input"></input>
                            </div>
                            <button onClick={this.handleRegisterSubmit}className="login-login-button">Submit</button>
                        </div>}
                        

                    </div>
                </div>
            </div>
        )
    }
}