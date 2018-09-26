import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as moment from 'moment';

import './Habits.css'
import AddHabitForm from './AddHabitForm';
import { getCurrentUser } from '../../redux/reducers/user';

const add = require('../../assets/plus.png')

class Habits extends Component {
    constructor() {
        super();
        this.state = {
            habitsList: [],
            addHabitVisible: false,
            habitDetailVisible: false,
            habitDetailShown: 1,
            habitEvents: [],
            habitEventsReturned: false,
            habitsToday: [],
            habitsCompletedToday: []
        }
    }

    toggleForm = () => {
        this.setState({
            addHabitVisible: !this.state.addHabitVisible,
            habitDetailVisible: false
        })
    }
    addHabitToList = (arr) => {
        this.setState({
            habitsList: arr
        })
    }
    showHabitDetail = (id) => {
        axios.get(`api/habitEvents?id=${id}`).then(result => {
            // console.log('habit events for this habit', result)
            this.setState({
                habitDetailVisible: true,
                habitDetailShown: id,
                addHabitVisible: false,
                habitEvents: result.data
            }, () => {
                this.setState({
                    habitEventsReturned: true
                })
            })
        })
    }
    addHabitEvent = (habitId) => {
        axios.post('api/habit', { habitId }).then(result => {
            let daysFromStart = 0
            let habitEventObj = {
                habitId,
                daysFromStart
            }
            axios.post('api/habitEvents', habitEventObj).then(() => {
                console.log(`habit event added as complete w/ daysFromStart=${habitEventObj.daysFromStart}, and habitId=${habitEventObj.habitId}`);
                axios.get(`/api/habitEvents?id=${habitId}`);
            }).catch(error => console.log('Error from Habits.js => addHabitEvent => axios.post("api/habitEvents")', error));
            axios.post('api/addHabitToday', { habitId, id: this.props.user.id }).then(result => {
                console.log("addHabitEvent => axios.post('api/addHabitToday') result", result);
            })
        })
    }
    getTodaysHabits = (id) => {
        axios.post('api/getTodaysHabits', { id }).then(result => {
            this.setState({
                habitsToday: result.data
            }, () => {
                this.updateTodaysHabits()
            })
        }).catch(error => console.log('Error from getTodaysHabits', error));
    }

    updateTodaysHabits = () => {
        var habitsCompletedToday = [];
        if (this.state.habitsList.length) {
            for (let i = 0; i < this.state.habitsList.length; i++) {
                let flag = false;
                for (let j = 0; j < this.state.habitsToday.length; j++) {
                    if (this.state.habitsList[i].id === this.state.habitsToday[j].habitid) flag = true
                }
                if (flag) {
                    habitsCompletedToday[i] = { completed: true, id: this.state.habitsList[i].id }
                } else {
                    habitsCompletedToday[i] = { completed: false, id: this.state.habitsList[i].id }
                }
            }
        }
        this.setState({
            habitsCompletedToday
        })
    }
    componentDidMount() {
        this.props.getCurrentUser();
        let { id } = this.props.user;
        axios.get('api/habits', { id }).then(result => {
            this.setState({
                habitsList: result.data
            }, () => {
                this.getTodaysHabits(id);
            })
        });
    }

    render() {
        if (this.state.habitsList.length) {
            let daysOfTheWeek = [' ', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let monthsOfTheYear = [' ', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            var allHabitsOverview = this.state.habitsList.map((e, i) => {
                e.date = e.dateformatted.split('/');
                let day = daysOfTheWeek[(+e.date[3]) + 1];
                let month = monthsOfTheYear[(+e.date[1]) + 1];
                return (
                    <div key={i} className="habits-sidebar-habit">
                        <button onClick={() => this.showHabitDetail(e.id)} className="habits-sidebar-habit">
                            <p className="habit-sidebar-text">{e.title} <br /> Started: {`${day}, ${month} ${e.date[2]}, ${e.date[0]}`}</p>
                        </button>
                    </div >
                )
            })

            // -----------------------------------------------------------------------------
            var allHabitsDetail = this.state.habitsList.filter((e) => e.id === this.state.habitDetailShown).map((e, i) => {
                e.date = e.dateformatted.split('/');
                let day = daysOfTheWeek[(+e.date[3]) + 1];
                let month = monthsOfTheYear[(+e.date[1]) + 1];
                var habitEventDivs = [];
                for (let i = 7; i > 1; i--) {
                    let targetDiv = (<div className="habits-detail-habit-progress" key={i}>{i} days ago
                    {this.state.habitEventsReturned &&
                            this.state.habitEvents.filter((e) => e.daysfromstart === `${i}`)[0] ?
                            <i className="far fa-check-circle habit-green-button"></i> // habit was completed that day
                            : // habit was not completed that day
                            <i className="far fa-times-circle habit-red-button"></i>}
                    </div>);
                    habitEventDivs.push(targetDiv)
                }
                return (
                    <div key={i} className="habits-detail-habit">
                        <h3>{e.title}</h3>
                        <p>{e.description}</p>
                        <i className="habit-type-icon">
                            {e.type === "Personal" ? <i className="fas fa-book-reader"></i> : e.type === "Professional" ? <i className="fas fa-user-tie"></i> : <i className="fas fa-heartbeat"></i>}
                        </i>
                        <p>You started tracking this habit on {`${day}, ${month} ${e.date[2]}, ${e.date[0]}, ${moment([+e.date[0], (+e.date[1]), +e.date[2]]).fromNow()}`}</p>
                        <p>Here's your progress for the past week: </p>
                        <div style={{ display: 'flex' }}>
                            {habitEventDivs}
                            <div className="habits-detail-habit-progress">yesterday
                            {this.state.habitEventsReturned && // checks that habitEvents array has been returned
                                    this.state.habitEvents.filter((e) => e.daysfromstart === "1")[0] ? // checks that first item in habitEvents {x} days ago is true
                                    <i className="far fa-check-circle habit-green-button"></i> // rendered if true
                                    : // if false 
                                    <i className="far fa-times-circle habit-red-button"></i>}
                            </div>
                            <div className="habits-detail-habit-progress">today
                            {this.state.habitEventsReturned && // checks that habitEvents array has been returned
                                    this.state.habitEvents.filter((e) => e.daysfromstart === "0")[0] ? // checks that first item in habitEvents {x} days ago is true
                                    <i className="far fa-check-circle habit-green-button"></i> // rendered if true
                                    : // if false
                                    <i className="far fa-times-circle habit-red-button"></i>}
                            </div>
                            <p>Completed today? </p>
                            <i onMouseDown={(habitId) => this.addHabitEvent(e.id)} className="far fa-check-circle"></i>
                        </div>
                    </div>
                );
            })
            // -----------------------------------------------------------------------------
        }

        var todaysHabits;
        if (this.state.habitsCompletedToday.length) {
            todaysHabits = this.state.habitsCompletedToday.map((e) => {
                console.log(e);
                if (e.completed) {
                    return <i className="far fa-check-circle habit-green-button"></i>
                } else {
                    return <i className="far fa-check-circle habit-quick-check" onMouseDown={(habitId) => this.addHabitEvent(e.id)}></i>
                }
            })
        }

        return (
            <div className="content-container" >
                <div>
                    {todaysHabits}
                </div>
                <div className="habits-sidebar">
                    {allHabitsOverview}
                </div>
                {!this.state.habitsList.length ?
                    <div className="habits-content" >
                        {
                            this.state.addHabitVisible ?
                                <div>
                                    <div onClick={this.toggleForm} className="add-habit-background">
                                    </div>
                                    <AddHabitForm habitsList={this.state.habitsList} currentUser={this.props.user}/**/ toggleForm={this.toggleForm} addHabitToList={this.addHabitToList} />
                                </div>
                                :
                                <div className="add-first-habit-button">
                                    <img src={add} onMouseDown={this.toggleForm} className="add-first-habit-plus" />
                                    <p>Add your first habit!</p>
                                </div>
                        }
                    </div>
                    :
                    <div className="habits-content">
                        {this.state.habitDetailVisible ?
                            <div>
                                <img src={add} onMouseDown={this.toggleForm} className="add-habit-button" />
                                <div>
                                    {allHabitsDetail}
                                </div>
                                {this.state.addHabitVisible &&
                                    <div>
                                        <div onClick={this.toggleForm} className="add-habit-background">
                                        </div>
                                        <AddHabitForm habitsList={this.state.habitsList} currentUser={this.props.user} toggleForm={this.toggleForm} addHabitToList={this.addHabitToList} />
                                    </div>}
                            </div>
                            :
                            <div>
                                <img src={add} onMouseDown={this.toggleForm} className="add-habit-button" />
                                <div>
                                    <p>user has habits, hasn't selected one</p>
                                </div>
                                {this.state.addHabitVisible &&
                                    <div>
                                        <div onClick={this.toggleForm} className="add-habit-background">
                                        </div>
                                        <AddHabitForm habitsList={this.state.habitsList} currentUser={this.props.user} toggleForm={this.toggleForm} addHabitToList={this.addHabitToList} />
                                    </div>}
                            </div>}
                    </div>
                }
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getCurrentUser })(Habits);