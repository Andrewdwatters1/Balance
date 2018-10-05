import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { ToastContainer, ToastStore } from 'react-toasts';
import OtherBackdrop from '../OtherBackdrop/OtherBackdrop'
import moment from 'moment'
import FocusCompleteModal from './Timer/FocusCompleteModal/FocusCompleteModal'
import BreakCompleteModal from './Timer/BreakCompleteModal/BreakCompleteModal'
import Weather from '../Weather/Weather.js'
import Backdrop from '../Backdrop/Backdrop'
import Notes from '../Notes/NotePad.js'
import Todo from '../Todo/Todo.js'
import Habits from '../Habits/Habits.js'
import Calendar from '../Calendar/Calendar.js'
import News from '../News/News.js'
import HomeEvents from './homeEvents/HomeEvents'
import InfoPage from '../InfoPage/infoPage'
import Settings from '../Settings/Settings'
import { getCurrentUser, logout } from '../../redux/reducers/user'

//CSS FILES
import './Home.css'
import './Timer/Timer.css'

//Images
const habits = require('../../assets/infinity-top.png')

//Timer Variables, Media

var timerTime = 25;
var breakTime = 5;
const question = require('../../assets/question.png')
const start = require('../../assets/play.png')
const pause = require('../../assets/pause.png')
const minimize = require('../../assets/minimize.png')
const focusAlertSound = require('../../assets/focusAlert.wav')

class Home extends Component {
    constructor(props) {
        super(props);
        var time = this.getTimeString();
        this.state = {

            isHomeCardVisible: true,
            isWeatherCardVisible: true,
            isHabitsMenuVisible: false,
            isTimerVisisble: false,
            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: false,
            isWeatherModalVisible: false,
            isNewsVisible: false,
            isSettingsVisible: false,
            isInfoPageVisible: false,
            habitsQuickToggler: false,

            date: new Date(),
            time: time,

            //Timer State
            pomodoros: 0,
            focusTimer: moment.duration(timerTime, 'minutes'),
            focusTimerCountdown: null,
            focusControlsAreVisible: true,
            breakTimer: moment.duration(breakTime, 'minutes'),
            breakTimerCountdown: null,
            breakControlsAreVisible: false,
            focusCompleteModalIsVisible: false,
            breakCompleteModalIsVisible: false,
            shouldAudioPlay: false
        }
    }

    getTimeString() {
        const date = new Date(Date.now()).toLocaleTimeString();
        return date;
    }

    componentDidMount() {
        this.props.getCurrentUser();
        let background = this.props.user.avitar
        document.body.style.background = `linear-gradient(\n        rgba(0,0,0,0.516),\n        rgba(0,0,0,0.516)\n    ),\n    url(${background}) no-repeat center center fixed`
        document.body.style.backgroundSize = 'cover'
        const _this = this;
        this.timer = setInterval(function () {
            var date = _this.getTimeString();
            _this.setState({
                time: date
            })
        }, 1000)
    }

    toggleHabitsMenu = () => {
        this.setState({
            isHabitsMenuVisible: !this.state.isHabitsMenuVisible
        })
    }

    homeClickHandler = () => {
        this.setState({
            isHomeCardVisible: true,
            isWeatherCardVisible: true,
            isHabitsMenuVisible: false,
            isSettingsVisible: false,
            isTimerVisisble: false,
            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: false,
            isWeatherModalVisible: false,
            isNewsVisible: false,
            habitsQuickToggler: false,
            isInfoPageVisible: false,
        })
    }

    notesToggler = () => {
        this.setState({
            isHomeCardVisible: false,
            isWeatherCardVisible: true,
            isHabitsMenuVisible: false,
            isNotesVisible: true,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: false,
            isNewsVisible: false,
            isInfoPageVisible: false,
            isSettingsPageVisible: false
        })
    }

    todoToggler = () => {
        this.setState({
            isHomeCardVisible: false,
            isWeatherCardVisible: true,
            isHabitsMenuVisible: false,
            isNotesVisible: false,
            isTodoVisible: true,
            isHabitsVisible: false,
            isCalendarVisible: false,
            isNewsVisible: false,
            isInfoPageVisible: false,
            isSettingsPageVisible: false
        })
    }
    habitsToggler = (shouldQuickViewDisplay) => {
        if (shouldQuickViewDisplay) {
            this.setState({
                habitsQuickToggler: shouldQuickViewDisplay,
                isHabitsVisible: true
            })
        } else {
            this.setState({
                isHomeCardVisible: false,
                isWeatherCardVisible: true,
                isHabitsMenuVisible: false,
                isNotesVisible: false,
                isTodoVisible: false,
                isHabitsVisible: true,
                isCalendarVisible: false,
                isNewsVisible: false,
                habitsQuickToggler: shouldQuickViewDisplay,
                isInfoPageVisible: false,
                isSettingsPageVisible: false
            })
        }
        this.logout()
    }
    habitsQuickViewToggler = () => {
        this.setState({
            isHabitsVisible: false
        })
    }
    calendarToggler = () => {
        this.setState({
            isHomeCardVisible: false,
            isWeatherCardVisible: true,
            isHabitsMenuVisible: false,
            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: true,
            isNewsVisible: false,
            isInfoPageVisible: false,
            isSettingsPageVisible: false
        })
    }
    newsToggler = () => {
        this.setState({
            isHomeCardVisible: false,
            isWeatherCardVisible: true,
            isHabitsMenuVisible: false,
            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: false,
            isNewsVisible: true,
            isInfoPageVisible: false,
            isSettingsPageVisible: false
        })
    }
    toggleTimer = () => {
        this.setState({
            isTimerVisible: !this.state.isTimerVisible
        })
        this.logout(0)
    }
    logout = (abs) => {
        if (document.getElementById('logout-button')) {
            ReactDOM.unmountComponentAtNode(document.getElementById('logout'));
        } else {
            if (abs && document.getElementById('logout')) {
                ReactDOM.render(
                    <button className="logout-user-button" onClick={this.confirmLogout} id="logout-button">LOGOUT</button>
                    , document.getElementById('logout'))
            }
        }
    }
    confirmLogout = () => {
        this.props.logout();
        this.props.getCurrentUser();
    }

    toggleInfoPage = () => {
        this.setState({
            isInfoPageVisible: true,
            isHomeCardVisible: false,
            isWeatherCardVisible: true,
            isHabitsMenuVisible: false,
            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: false,
            isNewsVisible: false,
            isSettingsVisible: false
        })
    }

    toggleSettingsPage = () => {
        this.setState({
            isSettingsVisible: true,
            isHomeCardVisible: false,
            isWeatherCardVisible: true,
            isHabitsMenuVisible: false,
            isNotesVisible: false,
            isTodoVisible: false,
            isHabitsVisible: false,
            isCalendarVisible: false,
            isNewsVisible: false,
            isInfoPageVisible: false
        })
    }
    //Timer Funcitons

    minimizeTimer = () => {
        this.setState({
            isTimerVisible: false
        })
    }
    startFocusTimer = () => {
        this.setState({
            focusTimerCountdown: setInterval(this.reduceFocusTimer, 1000)
        })
    }
    pauseFocusTimer = () => {
        this.setState({
            focusTimerCountdown: clearInterval(this.state.focusTimerCountdown)
        })
    }
    reduceFocusTimer = () => {
        const newTime = moment.duration(this.state.focusTimer);
        newTime.subtract(1, 'second');
        this.setState({
            focusTimer: newTime
        }, () => {
            if (this.state.focusTimer.get('minutes') === 0 && this.state.focusTimer.get('seconds') === -1) {
                this.setState({
                    focusTimerCountdown: clearInterval(this.state.focusTimerCountdown),
                    focusTimer: moment.duration(timerTime, 'minutes')
                }, () => {
                    this.completeFocusTimer();
                }
                )
            }
        }
        )
    }
    completeFocusTimer = () => {
        let { toggleFocusCompleteModal } = this
        let { audioTrigger } = this
        this.pomodoroIncrementer()
        this.startBreakTimer()
        toggleFocusCompleteModal()
        setTimeout(function () { toggleFocusCompleteModal() }, 3000);
        this.hideFocusControls();
        audioTrigger();
        setTimeout(function () { audioTrigger() }, 3000)
    }
    audioTrigger = () => {
        this.setState({
            shouldAudioPlay: !this.state.shouldAudioPlay
        })
    }
    toggleFocusCompleteModal = () => {
        this.setState({
            focusCompleteModalIsVisible: !this.state.focusCompleteModalIsVisible
        })
    }
    hideFocusControls = () => {
        this.setState({
            focusControlsAreVisible: !this.state.focusControlsAreVisible,
            breakControlsAreVisible: !this.state.breakControlsAreVisible
        })
    }
    startBreakTimer = () => {
        this.setState({
            breakTimerCountdown: setInterval(this.reduceBreakTimer, 1000)
        })
    }
    pauseBreakTimer = () => {
        this.setState({
            breakTimerCountdown: clearInterval(this.state.breakTimerCountdown)
        })
    }
    reduceBreakTimer = () => {
        const newTime = moment.duration(this.state.breakTimer);
        newTime.subtract(1, 'second');
        this.setState({
            breakTimer: newTime
        }, () => {
            if (this.state.breakTimer.get('minutes') === 0 && this.state.breakTimer.get('seconds') === -1) {
                this.setState({
                    breakTimerCountdown: clearInterval(this.state.breakTimerCountdown),
                    breakTimer: moment.duration(breakTime, 'minutes')
                }, () => {
                    this.startFocusTimer()
                    this.completeBreakTimer()
                }
                )
            }
        }
        )
    }
    toggleBreakCompleteModal = () => {
        this.setState({
            breakCompleteModalIsVisible: !this.state.breakCompleteModalIsVisible
        })
    }
    completeBreakTimer = () => {
        let { audioTrigger } = this;
        let { toggleBreakCompleteModal } = this;
        this.hideBreakControls();
        toggleBreakCompleteModal();
        audioTrigger();
        setTimeout(function () { audioTrigger() }, 3000)
        setTimeout(function () { toggleBreakCompleteModal() }, 3000)
        if (this.state.pomodoros === 3) {
            this.setState({
                breakTimer: moment.duration(15, 'minutes')
            })
        } else if (this.state.pomodoros === 4) {
            this.setState({
                pomodoros: 0
            })
        }
    }
    hideBreakControls = () => {
        this.setState({
            breakControlsAreVisible: !this.state.breakControlsAreVisible,
            focusControlsAreVisible: !this.state.focusControlsAreVisible
        })
    }
    pomodoroIncrementer = () => {
        this.setState({
            pomodoros: this.state.pomodoros + 1
        })
    }

    render() {
        
        let backdrop; //Timer
        if (this.state.isTimerVisible) {
            backdrop = <Backdrop click={this.toggleTimer} />
        }

        let otherBackdrop;
        if (this.state.isTimerVisisble || this.state.isNotesVisible || this.state.isTodoVisible || this.state.isHabitsVisible || this.state.isCalendarVisible || this.state.isWeatherModalVisible || this.state.isNewsVisible || this.state.isSettingsVisible || this.state.isInfoPageVisible ){
            otherBackdrop = <OtherBackdrop click={this.homeClickHandler}/>
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
            else return "Good Evening"
        }
        let formattedTime = this.state.time.slice(0, -6)

        //Timer-Related Renders

        let completedColor1 = "rgba(255, 255, 255, 0.304)";
        let completedColor2 = "rgba(255, 255, 255, 0.304)";
        let completedColor3 = "rgba(255, 255, 255, 0.304)";
        let completedColor4 = "rgba(255, 255, 255, 0.304)";
        if (this.state.pomodoros === 1) { completedColor1 = "rgba(255, 205, 5, 0.9)" }
        if (this.state.pomodoros === 2) { completedColor1 = "rgba(255, 205, 5, 0.9)"; completedColor2 = "rgba(255, 205, 5, 0.9)"; }
        if (this.state.pomodoros === 3) { completedColor1 = "rgba(255, 205, 5, 0.9)"; completedColor2 = "rgba(255, 205, 5, 0.9)"; completedColor3 = "rgba(255, 205, 5, 0.9)" }
        if (this.state.pomodoros === 4) { completedColor1 = "rgba(255, 205, 5, 0.9)"; completedColor2 = "rgba(255, 205, 5, 0.9)"; completedColor3 = "rgba(255, 205, 5, 0.9)"; completedColor4 = "rgba(255, 205, 5, 0.9)" }
        let activeColor = "rgb(255, 205, 5)";
        let inactiveColor = "#FAFAFA";
        let focusColor;
        let breakColor;
        if (this.state.focusControlsAreVisible) { focusColor = activeColor; breakColor = inactiveColor }
        else { focusColor = inactiveColor; breakColor = activeColor }
        const addZero = (val) => {
            if (val < 10) return `0${val}`;
            return `${val}`
        }
        let focusPlayButtonEnabled;
        if (this.state.focusTimerCountdown) { focusPlayButtonEnabled = "none" } else { focusPlayButtonEnabled = "auto" }


        return (
            <div className="window">
                <div>
                    {this.state.shouldAudioPlay && <audio src={focusAlertSound} autoPlay type="audio/wav">Your Browser Does Not Support Audio</audio>}
                    <div className="top-menu-button">
                        <img alt="habits-quick-check" src={habits} onMouseEnter={() => this.habitsToggler(true)} />
                    </div>
                        {backdrop}
                        {otherBackdrop}
                    <div>
                        {this.state.isTimerVisible &&
                            <div className="timer-container">
                                <img src={minimize} alt="minimize timer" className="timer-help-button" onClick={this.minimizeTimer} />
                                <img src={question} alt="help" className="timer-minimize-button" />
                                <div className="timer-indicator-width">
                                    <div style={{ borderRadius: "50%", border: `2px solid ${completedColor1}` }} className="number-circle"><p style={{ color: `${completedColor1}` }} >1</p></div>
                                    <div style={{ borderRadius: "50%", border: `2px solid ${completedColor2}` }} className="number-circle"><p style={{ color: `${completedColor2}` }} >2</p></div>
                                    <div style={{ borderRadius: "50%", border: `2px solid ${completedColor3}` }} className="number-circle"><p style={{ color: `${completedColor3}` }} >3</p></div>
                                    <div style={{ borderRadius: "50%", border: `2px solid ${completedColor4}` }} className="number-circle"><p style={{ color: `${completedColor4}` }} >4</p></div>
                                </div>
                                <div className="timer-details-wrapper">
                                    <div className="timer-details-box">
                                        {/*<img src={minus} alt="subtract one minute" className="plus-minus"/>*/}
                                        <span className="timer-title" style={{ color: `${focusColor}` }}>Focus:</span>
                                        <span className="timer-select-time">{`${addZero(this.state.focusTimer.get('minutes'))}:${addZero(this.state.focusTimer.get('seconds'))}`}</span>
                                        {/*<img src={plus} alt="add one minute" className="plus-minus"/>*/}
                                    </div>
                                    <div className="timer-details-box">
                                        {/*<img src={minus} alt="subtract one minute" className="plus-minus"/>*/}
                                        <span className="timer-title" style={{ color: `${breakColor}` }}>Break:</span>
                                        <span className="timer-select-time">{`${addZero(this.state.breakTimer.get('minutes'))}:${addZero(this.state.breakTimer.get('seconds'))}`}</span>
                                        {/*<img src={plus} alt="add one minute" className="plus-minus"/>*/}
                                    </div>
                                </div>
                                {this.state.focusControlsAreVisible &&
                                    <div className="timer-buttons-div">
                                        <img src={start} alt="start timer" className="timer-buttons" onClick={this.startFocusTimer} style={{ pointerEvents: focusPlayButtonEnabled }} />
                                        <img src={pause} alt="pause timer" className="timer-buttons" onClick={this.pauseFocusTimer} />
                                    </div>}
                                {this.state.breakControlsAreVisible &&
                                    <div className="timer-buttons-div">
                                        <img src={start} alt="start timer" className="timer-buttons" onClick={this.startBreakTimer} style={{ pointerEvents: focusPlayButtonEnabled }} />
                                        <img src={pause} alt="pause timer" className="timer-buttons" onClick={this.pauseBreakTimer} />
                                    </div>}
                            </div>
                        }
                    </div>

                    <div className="left-menu">
                        <div className="menu-spacer" />
                        <div className="icon-home" onClick={this.homeClickHandler} />
                        <div className="icon-notepad" style={{ marginLeft: "10px" }} onClick={this.notesToggler} />
                        <div className="icon-todos" onClick={this.todoToggler} />
                        <div className="icon-habits" onClick={() => this.habitsToggler(false)} />
                        <div className="icon-calendar" onClick={this.calendarToggler} />
                        <div className="icon-news" onClick={this.newsToggler} />
                        <div className="icon-timer" onClick={this.toggleTimer} />
                        <div className="icon-info" onClick={this.toggleInfoPage} />
                        <div className="icon-settings" onClick={this.toggleSettingsPage} />
                        <div className="icon-logout" onClick={this.logout} style={{marginLeft: "8px"}} />
                        <div className="menu-spacer" />
                    </div>


                    {/* Timer Modals*/}

                    {this.state.focusCompleteModalIsVisible && <FocusCompleteModal />}
                    {this.state.breakCompleteModalIsVisible && <BreakCompleteModal />}

                    {/*Feature Modals*/}

                    {this.state.isWeatherCardVisible && <Weather logout={this.logout} />}
                    {this.state.isNotesVisible && <Notes />}
                    {this.state.isTodoVisible && <Todo />}
                    {this.state.isHabitsVisible && <Habits quickView={this.state.habitsQuickToggler} habitsQuickViewToggler={this.habitsQuickViewToggler} />}
                    {this.state.isCalendarVisible && <Calendar isWeatherModalVisible={this.state.isWeatherModalVisible} />}
                    {this.state.isNewsVisible && <News />}
                    {this.state.isInfoPageVisible && <InfoPage />}
                    {this.state.isSettingsVisible && <Settings homeClick={this.homeClickHandler} />}


                    {this.state.isHomeCardVisible &&
                        <div className="home-center-card">
                            <h1>{formattedTime}</h1>
                            <h2>{getTimeOfDay()}, {this.props.user.firstname}.</h2>
                            <span>Today is </span>
                            <span>{day}, </span>
                            <span>{month} </span>
                            <span>{this.state.date.getDate()} </span>
                            <span>{this.state.date.getFullYear()}.</span>

                            <div className="home-spacer" id="logout"></div>

                            <div className="upcoming-events">
                                <p>Here are your upcoming events:</p>
                                <HomeEvents />
                            </div>

                        </div>
                    }
                    <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
                </div>
            </div >
        )
    }

}


const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getCurrentUser, logout })(Home);