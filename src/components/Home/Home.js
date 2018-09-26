import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, ToastStore } from 'react-toasts';

import Weather from '../Weather/Weather.js'
import Backdrop from '../Backdrop/Backdrop.js'
import Notes from '../Notes/NotePad.js'
import Todo from '../Todo/Todo.js'
import Habits from '../Habits/Habits.js'
import Calendar from '../Calendar/Calendar.js'
import Login from '../Login/Login.js'
import Timer from '../Timer/Timer.js'
import { getCurrentUser } from '../../redux/reducers/user'

import './Home.css'

const arrow = require('../../assets/play-button.png')
const notepad = require('../../assets/notepad.png')
const todos = require('../../assets/todo.png')
const habits = require('../../assets/infinity.png')
const calendar = require('../../assets/calendar.png')
const settings = require('../../assets/settings.png')


class Home extends Component {
    constructor(props) {
        super(props);
        var time = this.getTimeString();
        this.state = {

            isHomeCardVisible: true,
            isWeatherCardVisible: true,
            isNavMenuVisible: false,
            isHabitsMenuVisible: false,
            isTimerVisisble: false,

            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: false,

            date: new Date(),
            time: time,
            events: []
        }
    }

    getTimeString() {
        const date = new Date(Date.now()).toLocaleTimeString();
        return date;
    }

    componentDidMount() {
        this.props.getCurrentUser();
        const _this = this;
        this.timer = setInterval(function () {
            var date = _this.getTimeString();
            _this.setState({
                time: date
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    toggleNavMenu = () => {
        this.setState({
            isNavMenuVisible: !this.state.isNavMenuVisible
        })
    }

    toggleHabitsMenu = () => {
        this.setState({
            isHabitsMenuVisible: !this.state.isNavMenuVisible
        })
    }

    backdropClickHandler = () => {
        this.setState({
            isHabitsMenuVisisble: false,
            isNavMenuVisible: false,
            isTimerVisible: false
        });
    };

    notesToggler = () => {
        this.setState({
            isHomeCardVisible: false,
            isWeatherCardVisible: false,
            isHabitsMenuVisible: false,
            isNavMenuVisible: false,
            isNotesVisible: true,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: false,
        })
    }

    todoToggler = () => {
        this.setState({
            isHomeCardVisible: false,
            isWeatherCardVisible: false,
            isHabitsMenuVisible: false,
            isNavMenuVisible: false,
            isNotesVisible: false,
            isTodoVisible: true,
            isHabitsVisible: false,
            isCalendarVisible: false,
        })
    }

    habitsToggler = () => {
        this.setState({
            isHomeCardVisible: false,
            isWeatherCardVisible: false,
            isHabitsMenuVisible: false,
            isNavMenuVisible: false,
            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: true,
            isCalendarVisible: false,
        })
    }

    calendarToggler = () => {
        this.setState({
            isHomeCardVisible: false,
            isWeatherCardVisible: false,
            isHabitsMenuVisible: false,
            isNavMenuVisible: false,
            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: true,
        })
    }

    toggleTimer = () => {
        this.setState({
            isTimerVisible: true
        })
    }

    minimizeTimer = () => {
        this.setState({
            isTimerVisible: false
        })
    }

    render() {
        // console.log('current user', this.props.user);
        let backdrop;
        if (this.state.isNavMenuVisible || this.state.isHabitsMenuVisible) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }

        let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let dayNumber = this.state.date.getDay();
        let day = daysOfTheWeek[dayNumber];

        let monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let monthNumber = this.state.date.getMonth();
        let month = monthsOfTheYear[monthNumber];

        let getTimeOfDay = () => {
            let hour = this.state.date.getHours();
            if (hour >= 17) { return "Good Evening" }
            else if (hour >= 12) { return "Good Afternoon" }
            else if (hour >= 4) { return "Good Morning" }
            else return "Hello"
        }

        let formattedTime = this.state.time.slice(0, -6)


        if (this.props.user) {
            return (
                <div className="background">
                    <div className="background-cover">
                        <div className="top-menu"></div>
                        {backdrop}
                        <div className="top-menu-button">
                            <img src={habits} onMouseEnter={this.habitsToggler}/>
                        </div>

                        <div className="left-menu-button"
                            onMouseEnter={this.toggleNavMenu}>
                            <img src={arrow} />
                        </div>

                        <div>
                        {!this.state.isTimerVisible && <div id="timer-homepage-icon" onClick={this.toggleTimer}/>}
                        {this.state.isTimerVisible && <Timer minimize={this.minimizeTimer}/>}
                        </div>

                        {this.state.isNavMenuVisible && <div className="left-menu">
                            <div className="spacer"></div>
                            <div className="left-menu-item-wrapper">
                                <img src={notepad} onClick={this.notesToggler} />
                            </div>
                            <div className="left-menu-item-wrapper">
                                <img src={todos} onClick={this.todoToggler} />
                            </div>
                            <div className="left-menu-item-wrapper">
                                <img src={habits} onClick={this.habitsToggler} />
                            </div>
                            <div className="left-menu-item-wrapper">
                                <img src={calendar} onClick={this.calendarToggler} />
                            </div>
                            <div className="left-menu-item-wrapper">
                                <img src={settings} />
                            </div>
                        </div>}

                        {this.state.isWeatherCardVisible && <Weather />}

                        {this.state.isNotesVisible && <Notes />}
                        {this.state.isTodoVisible && <Todo />}
                        {this.state.isHabitsVisible && <Habits />}
                        {this.state.isCalendarVisible && <Calendar />}


                        {this.state.isHomeCardVisible &&
                            <div className="home-center-card">
                                <h1>{formattedTime}</h1>
                                <h2>{getTimeOfDay()}, {this.props.user.firstname}.</h2>
                                <span>Today is </span>
                                <span>{day}, </span>
                                <span>{month} </span>
                                <span>{this.state.date.getDate()} </span>
                                <span>{this.state.date.getFullYear()}</span>

                                <div className="home-spacer"></div>

                                <p>Here are your upcoming events:</p>

                            </div>
                        }
                    </div>
                    <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
                </div>
            )
        }
        else {
            return <Login/>
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getCurrentUser })(Home);