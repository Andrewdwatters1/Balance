//Imports

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Backdrop from '../Backdrop/Backdrop.js';
import axios from 'axios';
import { getCurrentUser } from '../../redux/reducers/user'

//Third-Party Libraries

import TextField from '@material-ui/core/TextField';
import InfiniteCalendar from 'react-infinite-calendar';

//Styles

import './Calendar.css';
import './side-calendar.css';

//Images

const add = require('../../assets/plus.png')
const eventdate = require('../../assets/calendar.png')
const time = require('../../assets/time.png')
const importance = require('../../assets/importance.png')
const question = require('../../assets/question.png')

class Calendar extends Component{

    constructor(){
        super();
        this.state={

            //   EVENT ARRAYS
            morningEvents: [],
            afternoonEvents: [],
            eveningEvents: [],

            //   EVENT FORM FIELDS
            selectedDate: new Date(),
            selectedTime: "12:00 PM",
            importance: "lo",
            eventName: "",
            eventDescription: "",

            //   UPDATE
            updatedDate: "",
            updatedTime: "",
            updatedImportance: "",
            updatedEventName: "",
            updatedDescription: "",

            //   OTHER
            isEventModalVisible: false,
            isInfoModalVisible: false,
            modalId: null
        }
    }

    //   LIFECYCLE METHODS
    
    componentDidMount(){
        let thisYear = this.state.selectedDate.getFullYear();
        let thisMonth = this.state.selectedDate.getMonth() + 1;
        let todaysDate = this.state.selectedDate.getDate();
        let formattedDate = `${thisYear}-${thisMonth}-${todaysDate}`;
        axios.get(`/api/events?event_date=${formattedDate}`).then(response => {
            response.data.map(event => {
                if(event.event_tod === "morning"){
                    this.setState({morningEvents: [...this.state.morningEvents, event]})}
                else if(event.event_tod === "afternoon"){
                    this.setState({afternoonEvents: [...this.state.afternoonEvents, event]})}
                else {this.setState({eveningEvents: [...this.state.eveningEvents, event]})}
                })});
    }

    //   ADD EVENT FUNCTIONS
    
    updateSelectedDate = (e) => {
        this.setState({
            selectedDate: e
        }, ()=>{
            this.refreshCalendar()
    })}

    toggleTime = (e) => {
        this.setState({
            selectedTime: e.target.value
        })
    }

    toggleHiImportance = (e) => {
        this.setState({
            importance: "hi"
        })
    }

    toggleLoImportance = (e) => {
        this.setState({
            importance: "lo"
        })
    }

    updateEventName = (e) => {
        this.setState({
            eventName: e.target.value
        })
    }

    updateEventDescription = (e) => {
        this.setState({
            eventDescription: e.target.value
        })
    }

    submitEventClick = (e) => {

        let dayNumber = this.state.selectedDate.getDay()
        let daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let monthsOfTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        let monthNumber = this.state.selectedDate.getMonth()

        let day = daysOfTheWeek[dayNumber];
        let month = monthsOfTheYear[monthNumber];
        let date = this.state.selectedDate.getDate()

        let formattedDate = `${day}, ${month} ${date}`

        let thisYear = this.state.selectedDate.getFullYear()
        let thisMonth = this.state.selectedDate.getMonth() + 1
        let todaysDate = this.state.selectedDate.getDate()

        let formattedDateString = `${thisYear}-${thisMonth}-${todaysDate}`

        let obj = {
            user_id: this.props.user.id,
            event_date: formattedDateString,
            event_formatted_date: formattedDate,
            event_time: this.state.selectedTime,
            event_importance: this.state.importance,
            event_name: this.state.eventName,
            event_details: this.state.eventDescription,
        }

        axios.post('/api/events', obj).then(res =>{
            this.eventFormReset();
            this.setState({
                isEventModalVisible: false
            })
            this.refreshCalendar()
        })
    }

    eventFormReset = () => {
        this.setState({
            selectedTime: "12:00 PM",
            importance: "lo",
            eventName: "",
            eventDescription: "",
        })
    }

    refreshCalendar(){
        this.setState({
            morningEvents: [],
            afternoonEvents: [],
            eveningEvents: [],
            }, ()=>{
                let thisYear = this.state.selectedDate.getFullYear()
                let thisMonth = this.state.selectedDate.getMonth() + 1
                let todaysDate = this.state.selectedDate.getDate()
                let formattedDate = `${thisYear}-${thisMonth}-${todaysDate}`
                axios.get(`/api/events?event_date=${formattedDate}`).then(response => {
                    response.data.map(event => {
                        if(event.event_tod === "morning"){
                                this.setState({morningEvents: [...this.state.morningEvents, event]})}
                            else if(event.event_tod === "afternoon"){
                                this.setState({afternoonEvents: [...this.state.afternoonEvents, event]})}
                            else {this.setState({eveningEvents: [...this.state.eveningEvents, event]})}
                        })});})
    }

    //   RENDERING TOGGLES

    toggleEventModal = () => {
        this.setState({
            isEventModalVisible: true,
        })
    }

    backdropClickHandler = () => {
        this.setState({
            isInfoModalVisible: false,
            isEventModalVisible: false,
            importance: 'lo',
            eventName: "",
            eventDescription: "",
            selectedTime: "12:00 PM"
            });
      };

    openEventInfo = (event) => {
        if(!this.state.isInfoModalVisible) {
            this.setState({
                isInfoModalVisible: true,
                modalId: event.event_id,
                updatedEventName: event.event_name,
                updatedDate: event.event_date,
                updatedTime: event.event_time,
                updatedImportance: event.event_importance,
                updatedDescription: event.event_details
            })
        }
    }
    
    //   EVENT UPDATER FUNCTIONS

    eventNameUpdater = (e) =>{
        this.setState({
            updatedEventName : e.target.value
        })
    }
    eventTimeUpdater = (e) =>{
        this.setState({
            updatedTime : e.target.value
        })
    }

    eventImportanceUpdaterHi = (e) =>{
        this.setState({
            updatedImportance: "hi"
        })
    }

    eventImportanceUpdaterLo = (e) => {
        this.setState({
            updatedImportance: "lo"
        })
    }

    eventDescriptionUpdater = (e) =>{
        this.setState({
            updatedDescription : e.target.value
        })
    }

    eventUpdaterSubmit = (id) => {

        var getTravelDateFormatted = function() {
            return function(str) {
                var daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                  d = new Date(str),
                  day = d.getDate(),
                  month = monthNames[d.getMonth()],
                  dayName = daysNames[d.getDay()];
        
                  return `${dayName}, ${month} ${day}`
                  };
                }();
    
            let obj = {
                event_date: this.state.updatedDate,
                event_formatted_date: getTravelDateFormatted(this.state.updatedDate),
                event_time: this.state.updatedTime,
                event_importance: this.state.updatedImportance,
                event_name: this.state.updatedEventName,
                event_details: this.state.updatedDescription,
            }
    
            axios.put(`/api/events/${id}`, obj).then(res =>{
                this.backdropClickHandler();
                this.refreshCalendar();
            })
        }

    eventDeleter = (id) => {
        axios.delete(`/api/events/${id}`).then(results => {
            this.refreshCalendar()
            this.setState({
                isInfoModalVisible: false
            })
        })
    }

    //   RENDER

    render(){

        function timeConverter(time){
            let hours = time.slice(0,2);
            var suffix = hours >= 12 ? "PM":"AM"; 
            hours = (+hours + 11) % 12 + 1;
            let minutes = time.slice(3,5);
            let formattedtime = `${hours}:${minutes} ${suffix}`;
            return formattedtime
          }

        let morningEventsRender = this.state.morningEvents.map( event => {
            let hiColor;
            let loColor;
            if(this.state.updatedImportance === "lo"){
                hiColor =  "rgba(125, 124, 124, 0.708)"
                loColor =  "#FAFAFA"
            }
            else{
                hiColor =  "#FAFAFA"
                loColor =  "rgba(125, 124, 124, 0.708)"
            }
            return(
                <div className="eventInfoWrapper" onClick={() => {this.openEventInfo(event)}}>
                    <span className="event-info-time">{timeConverter(event.event_time)}</span>
                    <span>{event.event_name}</span>
                   {this.state.isInfoModalVisible && this.state.modalId === event.event_id && 
                    <div className="event-info-modal">
                                <div className="event-menu-container">
                                <img alt="help" className="question" src={question}/>
                                <div className="event-name-wrapper">
                                         <h3 className="event-desciptor">Event</h3>
                                         <input value={this.state.updatedEventName} onChange={this.eventNameUpdater} className="event-name-input-field"></input>
                                         <img alt="" src={eventdate} className="sublimated-event-graphic"/>
                                     </div>
                                <div className="event-left">
                                    <div className="event-input-wrapper">
                                        <img className="event-calendar-icon" src={eventdate}></img>
                                        <p>{this.state.updatedDate}</p>
                                    </div>
                                    <div className="event-input-wrapper">
                                        <img alt="time" className="event-calendar-icon" src={time} style={{height: "22px"}}/>
                                            <TextField
                                                id="time"
                                                type="time"
                                                defaultValue={this.state.updatedTime}
                                                onChange={this.eventTimeUpdater}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                   step: 300,
                                                }}
                                                />
                                    </div>
                                    <div className="event-input-wrapper" style={{marginTop: "12px"}}>
                                        <img alt="importance" className="event-calendar-icon" style={{height: "22px"}} src={importance}/>
                                        <span onClick={this.eventImportanceUpdaterHi} className="Hi-Lo" style={{color : `${hiColor}`}}>HI</span>
                                        <div style={{width: "20px"}}></div>
                                        <span onClick={this.eventImportanceUpdaterLo} className="Hi-Lo" style={{color : `${loColor}`}}>LO</span>
                                    </div>
                                    <h3 className="add-event-submit" onClick={()=>this.eventUpdaterSubmit(event.event_id)}>Update Event</h3>
                                    <button className="delete-button" onClick={()=>this.eventDeleter(event.event_id)}>DELETE</button>
                                </div>
                                <div className="event-right">
                                     <div style={{textAlign : "center", marginTop: "30px"}}>
                                         <h3 style={{textAlign: "left", marginBottom: "10px"}}>Description</h3>
                                         <textarea value={this.state.updatedDescription} onChange={this.eventDescriptionUpdater} className="event-description-input-field"></textarea>
                                     </div>
                                </div>
                            </div>
                    </div> 
                    }
                </div>
            ) 
        });

        let afternoonEventRender = this.state.afternoonEvents.map( event => {
            let hiColor;
            let loColor;
            if(this.state.updatedImportance === "lo"){
                hiColor =  "rgba(125, 124, 124, 0.708)"
                loColor =  "#FAFAFA"
            }
            else{
                hiColor =  "#FAFAFA"
                loColor =  "rgba(125, 124, 124, 0.708)"
            }
            return(
                <div className="eventInfoWrapper" onClick={() => {this.openEventInfo(event)}}>
                    <span className="event-info-time">{timeConverter(event.event_time)}</span>
                    <span>{event.event_name}</span>
                   {this.state.isInfoModalVisible && this.state.modalId === event.event_id && 
                    <div className="event-info-modal">
                                <div className="event-menu-container">
                                <img alt="help" className="question" src={question}/>
                                <div className="event-name-wrapper">
                                         <h3 className="event-desciptor">Event</h3>
                                         <input value={this.state.updatedEventName} onChange={this.eventNameUpdater} className="event-name-input-field"></input>
                                         <img alt="" src={eventdate} className="sublimated-event-graphic"/>
                                     </div>
                                <div className="event-left">
                                    <div className="event-input-wrapper">
                                        <img className="event-calendar-icon" src={eventdate}></img>
                                        <p>{this.state.updatedDate}</p>
                                    </div>
                                    <div className="event-input-wrapper">
                                        <img alt="time" className="event-calendar-icon" src={time} style={{height: "22px"}}/>
                                            <TextField
                                                id="time"
                                                type="time"
                                                defaultValue={this.state.updatedTime}
                                                onChange={this.eventTimeUpdater}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                   step: 300,
                                                }}
                                                />
                                    </div>
                                    <div className="event-input-wrapper" style={{marginTop: "12px"}}>
                                        <img alt="importance" className="event-calendar-icon" style={{height: "22px"}} src={importance}/>
                                        <span onClick={this.eventImportanceUpdaterHi} className="Hi-Lo" style={{color : `${hiColor}`}}>HI</span>
                                        <div style={{width: "20px"}}></div>
                                        <span onClick={this.eventImportanceUpdaterLo} className="Hi-Lo" style={{color : `${loColor}`}}>LO</span>
                                    </div>
                                    <h3 className="add-event-submit" onClick={()=>this.eventUpdaterSubmit(event.event_id)}>Update Event</h3>
                                    <button className="delete-button" onClick={()=>this.eventDeleter(event.event_id)}>DELETE</button>
                                </div>
                                <div className="event-right">
                                     <div style={{textAlign : "center", marginTop: "30px"}}>
                                         <h3 style={{textAlign: "left", marginBottom: "10px"}}>Description</h3>
                                         <textarea value={this.state.updatedDescription} onChange={this.eventDescriptionUpdater} className="event-description-input-field"></textarea>
                                     </div>
                                </div>
                            </div>
                    </div> 
                    }
                </div>
            ) 
        });

        let eveningEventRender = this.state.eveningEvents.map( event => {
            let hiColor;
            let loColor;
            if(this.state.updatedImportance === "lo"){
                hiColor =  "rgba(125, 124, 124, 0.708)"
                loColor =  "#FAFAFA"
            }
            else{
                hiColor =  "#FAFAFA"
                loColor =  "rgba(125, 124, 124, 0.708)"
            }
            return(
                <div className="eventInfoWrapper" onClick={() => {this.openEventInfo(event)}}>
                    <span className="event-info-time">{timeConverter(event.event_time)}</span>
                    <span>{event.event_name}</span>
                   {this.state.isInfoModalVisible && this.state.modalId === event.event_id && 
                    <div className="event-info-modal">
                                <div className="event-menu-container">
                                <img alt="help" className="question" src={question}/>
                                <div className="event-name-wrapper">
                                         <h3 className="event-desciptor">Event</h3>
                                         <input value={this.state.updatedEventName} onChange={this.eventNameUpdater} className="event-name-input-field"></input>
                                         <img alt="" src={eventdate} className="sublimated-event-graphic"/>
                                     </div>
                                <div className="event-left">
                                    <div className="event-input-wrapper">
                                        <img className="event-calendar-icon" src={eventdate}></img>
                                        <p>{this.state.updatedDate}</p>
                                    </div>
                                    <div className="event-input-wrapper">
                                        <img alt="time" className="event-calendar-icon" src={time} style={{height: "22px"}}/>
                                            <TextField
                                                id="time"
                                                type="time"
                                                defaultValue={this.state.updatedTime}
                                                onChange={this.eventTimeUpdater}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                   step: 300,
                                                }}
                                                />
                                    </div>
                                    <div className="event-input-wrapper" style={{marginTop: "12px"}}>
                                        <img alt="importance" className="event-calendar-icon" style={{height: "22px"}} src={importance}/>
                                        <span onClick={this.eventImportanceUpdaterHi} className="Hi-Lo" style={{color : `${hiColor}`}}>HI</span>
                                        <div style={{width: "20px"}}></div>
                                        <span onClick={this.eventImportanceUpdaterLo} className="Hi-Lo" style={{color : `${loColor}`}}>LO</span>
                                    </div>
                                    <h3 className="add-event-submit" onClick={()=>this.eventUpdaterSubmit(event.event_id)}>Update Event</h3>
                                    <button className="delete-button" onClick={()=>this.eventDeleter(event.event_id)}>DELETE</button>
                                </div>
                                <div className="event-right">
                                     <div style={{textAlign : "center", marginTop: "30px"}}>
                                         <h3 style={{textAlign: "left", marginBottom: "10px"}}>Description</h3>
                                         <textarea value={this.state.updatedDescription} onChange={this.eventDescriptionUpdater} className="event-description-input-field"></textarea>
                                     </div>
                                </div>
                            </div>
                    </div> 
                    }
                </div>
            ) 
        });

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
        if(this.state.isNavMenuVisible || this.state.isHabitsMenuVisible || this.state.isEventModalVisible || this.state.isInfoModalVisible){
            calendarBackdrop = <Backdrop click={this.backdropClickHandler}/>
        }

        let dayNumber = this.state.selectedDate.getDay()
        let daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let monthsOfTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        let monthNumber = this.state.selectedDate.getMonth()
        let day = daysOfTheWeek[dayNumber];
        let month = monthsOfTheYear[monthNumber];
        let date = this.state.selectedDate.getDate()
        let formattedDate = `${day}, ${month} ${date}`

        let hiColor;
        let loColor;
        if(this.state.importance === "lo"){
            hiColor =  "rgba(125, 124, 124, 0.708)"
            loColor =  "#FAFAFA"
        }
        else{
            hiColor =  "#FAFAFA"
            loColor =  "rgba(125, 124, 124, 0.708)"
        }

        //  RETURN

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
                        <div className="button-menu-wrapper-visible">
                            <img alt="add" src={add} onClick={this.toggleEventModal} className="add-button"/>
                            {this.state.isEventModalVisible &&
                            <div className="add-event-menu">
                                <div className="add-event-triangle"></div>
                                <div className="event-menu-container">
                                <img alt="help" className="question" src={question}/>
                                <div className="event-name-wrapper">
                                         <h3 className="event-desciptor">Event</h3>
                                         <input className="event-name-input-field" onChange={this.updateEventName}></input>
                                         <img alt="" src={eventdate} className="sublimated-event-graphic"/>
                                     </div>
                                <div className="event-left">
                                    <div className="event-input-wrapper">
                                        <img className="event-calendar-icon" src={eventdate}></img>
                                        <p>{formattedDate}</p>
                                    </div>
                                    <div className="event-input-wrapper">
                                        <img alt="time" className="event-calendar-icon" src={time} style={{height: "22px"}}/>
                                            <TextField
                                                id="time"
                                                type="time"
                                                defaultValue="12:00"
                                                onChange={this.toggleTime}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                   step: 300,
                                                }}
                                                />
                                    </div>
                                    <div className="event-input-wrapper" style={{marginTop: "12px"}}>
                                        <img alt="importance" className="event-calendar-icon" style={{height: "22px"}} src={importance}/>
                                        <span onClick={this.toggleHiImportance} className="Hi-Lo" style={{color : `${hiColor}`}}>HI</span>
                                        <div style={{width: "20px"}}></div>
                                        <span onClick={this.toggleLoImportance} className="Hi-Lo" style={{color : `${loColor}`}}>LO</span>
                                    </div>
                                    <h3 className="add-event-submit" onClick={this.submitEventClick}>Add Event</h3>
                                </div>
                                <div className="event-right">
                                     <div style={{textAlign : "center", marginTop: "30px"}}>
                                         <h3 style={{textAlign: "left", marginBottom: "10px"}}>Description</h3>
                                         <textarea onChange={this.updateEventDescription} className="event-description-input-field"></textarea>
                                     </div>
                                </div>
                                </div>
                            </div>}
                        </div>
                    <div className="calendar-morning">
                        <div className="event-list">
                            {morningEventsRender}
                        </div>
                    </div>
                    <div className="calendar-afternoon">
                        <div className="event-list">
                        {afternoonEventRender}
                        </div>
                    </div>
                    <div className="calendar-evening">
                        <div className="event-list">
                        {eveningEventRender}
                        </div>
                    </div>
            </div>    
            </div>
        )
    }
}

//REDUX

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getCurrentUser })(Calendar);