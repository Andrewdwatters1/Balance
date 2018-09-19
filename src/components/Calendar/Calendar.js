import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'
import './Calendar.css'
import Backdrop from '../Backdrop/Backdrop.js'

//images
const add = require('../../assets/plus.png')
const sunrise = require('../../assets/sunrise.png')
const afternoon = require('../../assets/sun.png')
const evening = require('../../assets/moon-and-stars.png')

export default class Calendar extends Component{
    constructor(){
        super();
        this.state={
            selectedDate: '',
            isEventModalVisible: false,
        }
    }

    updateSelectedDate = (e) => {
        this.setState({
            selectedDate: e
        })
    }

    toggleEventModal = () => {
        this.setState({
            isEventModalVisible: true
        })
    }

    backdropClickHandler = () => {
        this.setState({
            isEventModalVisible: false
            });
      };

    render(){

        let calendarTheme = {
            accentColor: 'rgba(0, 0, 0, 0.0)',
            floatingNav: {
                background: 'rgba(0, 0, 0, 0.0)',
                chevron: 'rgba(0, 0, 0, 0.0)',
                color: 'rgba(0, 0, 0, 0.0)',
            },
            headerColor: 'rgba(0, 0, 0, 0.0)',
            selectionColor: 'rgba(233, 88, 88, 0.708)',
            textColor: {
                active: 'rgba(0, 0, 0, 0.0)',
                default: 'rgba(0, 0, 0, 0.0)',
            },
            todayColor: 'rgba(255, 205, 5, 0.769)',
            weekdayColor: 'rgba(41, 40, 40, 0.700)',
        }

        let calendarBackdrop;
        if(this.state.isNavMenuVisible || this.state.isHabitsMenuVisible || this.state.isEventModalVisible){
            calendarBackdrop = <Backdrop click={this.backdropClickHandler}/>
        }

       let today = new Date ()

        return(

            <div className="content-container">
            
                <div className="calendar-div">
                    <InfiniteCalendar
                        width={"100%"}
                        theme={calendarTheme}
                        onSelect={this.updateSelectedDate}
                        className="calendar"/>
                </div>

                {calendarBackdrop}

                <div className="calendar-day-info">
                    <div className="calendar-morning">
                        <img src={add} onClick={this.toggleEventModal} className="add-button"/>
                        <img src={sunrise} className="morning-background-icon"/>
                    </div>
                    <div className="calendar-afternoon">
                        <img src={afternoon} className="afternoon-background-icon"/>
                    </div>
                    <div className="calendar-evening">
                        <img src={evening} className="night-background-icon"/>
                    </div>
                </div>

                

            </div>
        )
    }
}
