//Imports
import React, { Component } from 'react';
import Weather from '../Weather/Weather.js'
import Backdrop from '../Backdrop/Backdrop.js'

//CSS

import './Home.css'

//Images

const arrow = require('../../assets/play-button.png')
const notepad = require('../../assets/notepad.png')
const todos = require('../../assets/todo.png')
const habits = require('../../assets/infinity.png')
const calendar = require('../../assets/calendar.png')
const settings = require('../../assets/settings.png')

export default class Home extends Component {
    constructor(props){
        super();
        var time= this.getTimeString();
        this.state={
            isNavMenuVisible: false,
            isHabitsMenuVisible: false,
            date: new Date(),
            time: time,
            events: [],   //
            user: "Ryan"  // to be pulled from user table
        }
    }

    getTimeString() {
        const date = new Date(Date.now()).toLocaleTimeString();
        return date;
      }

    componentDidMount() {
        const _this = this;
        this.timer = setInterval(function(){
            var date = _this.getTimeString();
            _this.setState({
                time: date
          })
        },1000)
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
            isNavMenuVisible: false
            });
      };

    render(){

        let backdrop;
        if(this.state.isNavMenuVisible || this.state.isHabitsMenuVisible){
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }

        let daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        let dayNumber = this.state.date.getDay();
        let day = daysOfTheWeek[dayNumber];

        let monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let monthNumber = this.state.date.getMonth();
        let month = monthsOfTheYear[monthNumber];

        let getTimeOfDay = () => {
            let hour = this.state.date.getHours();
            if (hour >= 17) { return "Evening" }
            else if (hour >= 12) { return "Afternoon" }
            else if  (hour >= 4) "Morning"
            else return "Evening"
        }

        let formattedTime = this.state.time.slice(0, -6)



        return(

            <div className="background">
            <div className="background-cover">
                <div className="top-menu"></div>
                {backdrop}
                    <div className="top-menu-button">
                    <img src={habits}/>
                </div>



                <div className="left-menu-button"
                    onClick={this.toggleNavMenu}>
                    <img src={arrow}/>
                </div>

                {this.state.isNavMenuVisible && <div className="left-menu">
                    <div className="spacer"></div>
                    <div className="left-menu-item-wrapper">
                        <img src={notepad}/>
                    </div>
                    <div className="left-menu-item-wrapper">
                        <img src={todos}/>
                    </div>
                    <div className="left-menu-item-wrapper">
                        <img src={habits}/>
                    </div>
                    <div className="left-menu-item-wrapper">
                        <img src={calendar}/>
                    </div>
                    <div className="left-menu-item-wrapper">
                        <img src={settings}/>
                    </div>
                </div>}

                <Weather/>

                    <div className="home-center-card">
                        <h1>{formattedTime}</h1>
                        <h2>Good {getTimeOfDay()}, {this.state.user}.</h2>
                        <span>Today is </span>
                        <span>{day}, </span>
                        <span>{month} </span>
                        <span>{this.state.date.getDate()} </span>
                        <span>{this.state.date.getFullYear()}</span>

                        <div className="home-spacer"></div>

                        <p>Here are your upcoming events:</p>
                        
                    </div>
                    </div>
                    </div>
                    

        )
    }
}


