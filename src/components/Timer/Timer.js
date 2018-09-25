import React, { Component } from 'react'
import './Timer.css'

//Images

const question = require('../../assets/question.png')
const start = require('../../assets/play.png')
const pause = require('../../assets/pause.png')
const minimize = require('../../assets/minimize.png')
const minus = require('../../assets/minimize.png')
const plus = require('../../assets/plus.png')

export default class Timer extends Component{
    constructor(){
        super();
        this.state={
            timerLength: '25:00',
            breakLength: '5:00'
        }
    }

        render(){
            return(
                <div className="timer-container">
                    <img src={minimize} alt="minimize timer" className="timer-help-button" onClick={this.props.minimize}/>
                    <img src={question} alt="help" className="timer-minimize-button"/>
                    <div className="timer-details-wrapper">
                    <div className="timer-details-box">
                        <img src={minus} alt="subtract one minute" className="plus-minus"/><span className="timer-title">Focus:</span><span className="timer-select-time">{this.state.timerLength}</span><img src={plus} alt="add one minute" className="plus-minus"/>
                    </div>
                    <div className="timer-details-box">
                    <img src={minus} alt="subtract one minute" className="plus-minus"/><span className="timer-title">Break:</span><span className="timer-select-time">{this.state.breakLength}</span><img src={plus} alt="add one minute" className="plus-minus"/>
                    </div>
                    </div>
                    <div className="timer-buttons-div">
                    <img src={start} alt="start timer" className="timer-buttons"/>
                    <img src={pause} alt="pause timer" className="timer-buttons"/>
                    </div>
                </div>
            )
        }
    }
