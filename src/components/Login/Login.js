import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { getCurrentUser } from '../../redux/reducers/user';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginVisible: true, // else register button
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            zip: "",
        }
    }

    toggleRegister = () => {
        this.setState({
            isLoginVisible: !this.state.isLoginVisible
        })
    }
    handleFirstNameInput = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }
    handleLastNameInput = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }
    handleEmailInput = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleUsernameInput = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handlePasswordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleZipInput = (e) => {
        this.setState({
            zip: e.target.value
        })
    }
    handleLoginSubmit = (e) => {
        e.preventDefault();
        let { username, password } = this.state;
        let loginInfo = { username, password };
        axios.post('/auth/login', loginInfo).then(result => {
            this.props.getCurrentUser();
        })
        this.setState({
            username: "",
            password: ""
        })
    }
    handleRegisterSubmit = (e) => {
        e.preventDefault();
        let { firstName, lastName, username, password, email, zip } = this.state;
        let newUserInfo = { firstName, lastName, username, password, email, zip };
        axios.post('/auth/register', newUserInfo).then(result => {
            let loginInfo = { username: newUserInfo.username, password: newUserInfo.password };
            axios.post('/auth/login', loginInfo).then(response => {
                this.props.getCurrentUser();
            })
        })
        this.setState({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            zip: "",
        })
    }

    render() {
        let { firstName, lastName, username, email, password, zip } = this.state;
        let loginSubmitEnabled = username && password;
        let registerSubmitEnabled = firstName && lastName && username && email && password && zip
        return (
            <div className="background">
                <div className="background-cover">
                    <div className="content-container">
                        <h1>Welcome to Planner</h1>
                        {
                            this.state.isLoginVisible
                                ?
                                <div className="login-form-container">
                                    <h3>Welcome Back!    Please Login</h3>
                                    <div className="login-field-wrapper">
                                        <p>USERNAME</p>
                                        <input type="text" onChange={this.handleUsernameInput} value={this.state.username} placeholder="username" className="login-input"></input>
                                        <p>PASSWORD</p>
                                        <input type="text" onChange={this.handlePasswordInput} value={this.state.password} placeholder="password" className="login-input"></input>
                                        <button onClick={this.handleLoginSubmit} disabled={!loginSubmitEnabled} className="login-button">SUBMIT</button>
                                        <div styles={{ height: '60%' }}> </div>
                                    </div>
                                    <button onClick={this.toggleRegister} className="login-button outside-form register">REGISTER</button>
                                </div>
                                :
                                <div className="login-form-container">
                                    <h3>Welcome!    Please Register Below</h3>
                                    <div className="login-field-wrapper">
                                        <p>FIRST NAME</p>
                                        <input type="text" onChange={this.handleFirstNameInput} value={this.state.firstName} placeholder="First Name" className="login-input"></input>
                                        <p>LAST NAME</p>
                                        <input type="text" onChange={this.handleLastNameInput} value={this.state.lastName} placeholder="Last Name" className="login-input"></input>
                                        <p>EMAIL</p>
                                        <input type="text" onChange={this.handleEmailInput} value={this.state.email} placeholder="email@domain.com" className="login-input"></input>
                                        <p>USERNAME</p>
                                        <input type="text" onChange={this.handleUsernameInput} value={this.state.username} placeholder="username" className="login-input"></input>
                                        <p>PASSWORD</p>
                                        <input type="text" onChange={this.handlePasswordInput} value={this.state.password} placeholder="password" className="login-input"></input>
                                        <p>ZIP CODE</p>
                                        <input type="text" onChange={this.handleZipInput} value={this.state.zip} type="zipcode" pattern="(\d{5}([\-]\d{4})?)" placeholder="xxxxx-xxxx" className="login-input"></input>
                                        <button onClick={this.handleRegisterSubmit} disabled={!registerSubmitEnabled} className="login-button">Submit</button>
                                    </div>
                                    <button onClick={this.toggleRegister} className="login-button outside-form">LOGIN</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getCurrentUser })(Login);