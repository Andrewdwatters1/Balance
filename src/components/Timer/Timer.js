//Imports (Libraries, Components)
import React, { Component } from 'react'
import moment from 'moment'
import './Timer.css'

//Variables
var timerTime = 1;
var breakTime = 1;

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

            focusTimer: moment.duration(timerTime, 'minutes'),
            focusTimerCountdown: null,

            breakTimer: moment.duration(breakTime, 'minutes'),
            breakTimerCountdown: null

          };
    }

    //    Focus Timer Controls

    startFocusTimer = () => {
        this.setState({
            focusTimerCountdown: setInterval(this.reduceFocusTimer, 1000)
        })
    }
    pauseFocusTimer = () => {
        this.setState({
            focusTimerCountdown: clearInterval(this.state.timer)
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
                    focusTimerCountdown: clearInterval(this.state.timer),
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
        alert("Done!");
        this.pomodoroIncrementer();
        this.startBreakTimer();
        this.focusTimerCompleterSound()
    }

    focusTimerCompleterSound = () => {
        this.myRef = React.createRef();
        return(
            <audio ref={this.myRef} src={focusAlertSound} autoPlay/>
        )
    }
 

    //    Break Timer Controls

    startBreakTimer = () => {
        this.setState({
            breakTimerCountdown: setInterval(this.reduceBreakTimer, 1000)
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
                    breakTimerCountdown: clearInterval(this.state.breakTimer),
                    breakTimer: moment.duration(breakTime, 'minutes')
        }, () => {
            this.completeBreakTimer();
        }
        )
    }
}
)
    }

    //  Other

    pomodoroIncrementer = () => {
        var pomodoroCount = this.state.pomodoros
        this.setState({
            pomodoros : pomodoroCount+=pomodoroCount
        })
    }

        render(){

            const addZero = (val) => {
                if (val < 10) return `0${val}`;
                return `${val}`
            }

            let playButtonEnabled;
            if(this.state.focusTimerCountdown){ playButtonEnabled = "none"}else{ playButtonEnabled = "auto"}

            let pauseButtonEnabled;
            if(this.state.focusTimerCountdown === null){pauseButtonEnabled = "auto"}else{pauseButtonEnabled = "none"}

            return(
                <div className="timer-container">
                    <img src={minimize} alt="minimize timer" className="timer-help-button" onClick={this.props.minimize}/>
                    <img src={question} alt="help" className="timer-minimize-button"/>
                    <div className="timer-details-wrapper">
                    <div className="timer-details-box">
                        {/*<img src={minus} alt="subtract one minute" className="plus-minus"/>*/}
                        <span className="timer-title">Focus:</span>
                        <span className="timer-select-time">{`${addZero(this.state.focusTimer.get('minutes'))}:${addZero(this.state.focusTimer.get('seconds'))}`}</span>
                        {/*<img src={plus} alt="add one minute" className="plus-minus"/>*/}
                    </div>
                    <div className="timer-details-box">
                    {/*<img src={minus} alt="subtract one minute" className="plus-minus"/>*/}
                    <span className="timer-title">Break:</span>
                    <span className="timer-select-time">{`${addZero(this.state.breakTimer.get('minutes'))}:${addZero(this.state.breakTimer.get('seconds'))}`}</span>
                    {/*<img src={plus} alt="add one minute" className="plus-minus"/>*/}
                    </div>
                    </div>
                    <div className="timer-buttons-div">
                    <img src={start} alt="start timer" className="timer-buttons" onClick={this.startFocusTimer} style={{pointerEvents : playButtonEnabled}}/>
                    <img src={pause} alt="pause timer" className="timer-buttons" onClick={this.pauseFocusTimer} /*style={{pointerEvents : pauseButtonEnabled}}*//>
                    </div>
                </div>
            )
        }
    }
