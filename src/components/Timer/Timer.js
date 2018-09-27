//Imports (Libraries, Components)
import React, { Component } from 'react'
import moment from 'moment'
import './Timer.css'
import FocusCompleteModal from './FocusCompleteModal/FocusCompleteModal'
import BreakCompleteModal from './BreakCompleteModal/BreakCompleteModal'
import Alarm from './Alarm/Alarm'

//Variables
var timerTime = 25;
var breakTime = 5;

//Images etc.
const question = require('../../assets/question.png')
const start = require('../../assets/play.png')
const pause = require('../../assets/pause.png')
const minimize = require('../../assets/minimize.png')
const minus = require('../../assets/minimize.png')
const plus = require('../../assets/plus.png')
const focusAlertSound = require('../../assets/focusAlert.wav')

export default class Timer extends Component{
    constructor(){
        super();
        this.state = {
            
            pomodoros: 0,

    //   Focus Timer State
    
            focusTimer: moment.duration(timerTime, 'minutes'),
            focusTimerCountdown: null,
            focusControlsAreVisible: true,

    //    Break Timer State

            breakTimer: moment.duration(breakTime, 'minutes'),
            breakTimerCountdown: null,
            breakControlsAreVisible: false,

    //    Modal Toggling

            focusCompleteModalIsVisible: false,
            breakCompleteModalIsVisible: false
          };
    }

    //    Focus Timer Controls

    startFocusTimer = () => {
        this.setState({
            focusTimerCountdown: setInterval(this.reduceFocusTimer, 20)
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
            if ( this.state.focusTimer.get('minutes') === 0 && this.state.focusTimer.get('seconds') === -1){
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
        let {toggleFocusCompleteModal} = this
        this.pomodoroIncrementer()
        this.startBreakTimer()
        this.toggleFocusCompleteModal()
        setTimeout(function(){toggleFocusCompleteModal()}, 3000);
        this.hideFocusControls();
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

    //    Break Timer Controls

    startBreakTimer = () => {
        this.setState({
            breakTimerCountdown: setInterval(this.reduceBreakTimer, 20)
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
            if ( this.state.breakTimer.get('minutes') === 0 && this.state.breakTimer.get('seconds') === -1){
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
        let {toggleBreakCompleteModal} = this;
        this.hideBreakControls();
        toggleBreakCompleteModal();
        setTimeout(function(){toggleBreakCompleteModal()}, 3000)
        if(this.state.pomodoros === 3){
            this.setState({
                breakTimer: moment.duration(15, 'minutes')
            })
        }else if(this.state.pomodoros === 4){
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

    //      Other

    pomodoroIncrementer = () => {
        this.setState({
            pomodoros: this.state.pomodoros+1
        })
    }

        render(){

            let completedColor1 = "rgba(255, 255, 255, 0.304)";
            let completedColor2 = "rgba(255, 255, 255, 0.304)";
            let completedColor3 = "rgba(255, 255, 255, 0.304)";
            let completedColor4 = "rgba(255, 255, 255, 0.304)";

            if(this.state.pomodoros === 1){completedColor1 = "rgba(255, 205, 5, 0.9)"}
            if(this.state.pomodoros === 2){completedColor1 = "rgba(255, 205, 5, 0.9)"; completedColor2 = "rgba(255, 205, 5, 0.9)";}
            if(this.state.pomodoros === 3){completedColor1 = "rgba(255, 205, 5, 0.9)"; completedColor2 = "rgba(255, 205, 5, 0.9)"; completedColor3 = "rgba(255, 205, 5, 0.9)"}
            if(this.state.pomodoros === 4){completedColor1 = "rgba(255, 205, 5, 0.9)"; completedColor2 = "rgba(255, 205, 5, 0.9)"; completedColor3 = "rgba(255, 205, 5, 0.9)"; completedColor4 = "rgba(255, 205, 5, 0.9)"}

            let activeColor = "rgb(255, 205, 5)";
            let inactiveColor = "#FAFAFA";
            let focusColor;
            let breakColor;

            if(this.state.focusControlsAreVisible){focusColor = activeColor; breakColor = inactiveColor}
            else{focusColor = inactiveColor; breakColor = activeColor}

            const addZero = (val) => {
                if (val < 10) return `0${val}`;
                return `${val}`
            }

            let focusPlayButtonEnabled;
            if(this.state.focusTimerCountdown){ focusPlayButtonEnabled = "none"}else{ focusPlayButtonEnabled = "auto"}

            // let pauseButtonEnabled;
            // if(this.state.focusTimerCountdown === null){pauseButtonEnabled = "auto"}else{pauseButtonEnabled = "none"};

            return(
                <div className="timer-container">
                {this.state.focusCompleteModalIsVisible && <FocusCompleteModal/>}
                {this.state.breakCompleteModalIsVisible && <BreakCompleteModal/>}
                    <img src={minimize} alt="minimize timer" className="timer-help-button" onClick={this.props.minimize} minimize={this.props.minimize}/>
                    <img src={question} alt="help" className="timer-minimize-button"/>
                    <div className="timer-indicator-width">
                        <div style={{borderRadius: "50%", border: `2px solid ${completedColor1}`}} className="number-circle"><p style={{color: `${completedColor1}`}} >1</p></div>
                        <div style={{borderRadius: "50%", border: `2px solid ${completedColor2}`}} className="number-circle"><p style={{color: `${completedColor2}`}} >2</p></div>
                        <div style={{borderRadius: "50%", border: `2px solid ${completedColor3}`}} className="number-circle"><p style={{color: `${completedColor3}`}} >3</p></div>
                        <div style={{borderRadius: "50%", border: `2px solid ${completedColor4}`}} className="number-circle"><p style={{color: `${completedColor4}`}} >4</p></div>
                    </div>
                    <div className="timer-details-wrapper">
                    <div className="timer-details-box">
                        {/*<img src={minus} alt="subtract one minute" className="plus-minus"/>*/}
                        <span className="timer-title" style={{color: `${focusColor}`}}>Focus:</span>
                        <span className="timer-select-time">{`${addZero(this.state.focusTimer.get('minutes'))}:${addZero(this.state.focusTimer.get('seconds'))}`}</span>
                        {/*<img src={plus} alt="add one minute" className="plus-minus"/>*/}
                    </div>
                    <div className="timer-details-box">
                    {/*<img src={minus} alt="subtract one minute" className="plus-minus"/>*/}
                    <span className="timer-title" style={{color: `${breakColor}`}}>Break:</span>
                    <span className="timer-select-time">{`${addZero(this.state.breakTimer.get('minutes'))}:${addZero(this.state.breakTimer.get('seconds'))}`}</span>
                    {/*<img src={plus} alt="add one minute" className="plus-minus"/>*/}
                    </div>
                    </div>
                    {this.state.focusControlsAreVisible && 
                    <div className="timer-buttons-div">
                    <img src={start} alt="start timer" className="timer-buttons" onClick={this.startFocusTimer} style={{pointerEvents : focusPlayButtonEnabled}}/>
                    <img src={pause} alt="pause timer" className="timer-buttons" onClick={this.pauseFocusTimer}/>
                    </div>}
                    {this.state.breakControlsAreVisible && 
                    <div className="timer-buttons-div">
                    <img src={start} alt="start timer" className="timer-buttons" onClick={this.startBreakTimer} style={{pointerEvents : focusPlayButtonEnabled}}/>
                    <img src={pause} alt="pause timer" className="timer-buttons" onClick={this.pauseBreakTimer}/>
                    </div>}
                </div>
            )
        }
    }
