import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as moment from 'moment';

import './Habits.css'
import AddHabitForm from './AddHabitForm';
import HabitQuickMenu from './HabitQuickMenu';
import { getCurrentUser } from '../../redux/reducers/user';
import { updateHabitsCompletedToday } from '../../redux/reducers/habits';

const add = require('../../assets/plus.png');
const trash = require('../../assets/trash-icon.png');
const loading = require('../../assets/loading.svg');

export class Habits extends Component {
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
            habitsCompletedToday: [],
            habitQuickView: false,
            deleteConfirmationOpen: false,
            shouldLoadingDisplay: true,
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
                    habitEventsReturned: true,
                    deleteConfirmationOpen: false
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
                // console.log(`habit event added as complete w/ daysFromStart=${habitEventObj.daysFromStart}, and habitId=${habitEventObj.habitId}`);
                axios.get(`/api/habitEvents?id=${habitId}`).then(result => {
                    this.setState({
                        habitEvents: result.data
                    })
                })
            }).catch(error => console.log('Error from Habits.js => addHabitEvent => axios.post("api/habitEvents")', error));
            axios.post('api/addHabitToday', { habitId, id: this.props.user.id }).then(result => {
                this.setState({
                    habitsToday: result.data
                }, () => {
                    this.updateTodaysHabits();
                })
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
        this.props.updateHabitsCompletedToday(habitsCompletedToday)
    }
    getUpdatedHabitsByUser = () => {
        // let { id } = this.props.user;
        let { id } = this.props.user || 1; // testing only
        axios.get('api/habits', { id }).then(result => {
            this.setState({
                habitsList: result.data
            }, () => {
                this.getTodaysHabits(id);
            })
        });
    }
    toggleDeleteConfirmation = () => {
        this.setState({
            deleteConfirmationOpen: !this.state.deleteConfirmationOpen
        })
    }
    deleteHabit = (id) => {
        axios.post('api/deleteHabit', { id }).then(result => {
            this.getUpdatedHabitsByUser();
        })
    }
    componentDidMount() {
        this.props.getCurrentUser();
        this.getUpdatedHabitsByUser();
        setTimeout(() => {
            this.setState({
                shouldLoadingDisplay: false
            })
        }, 150)
    }

    render() {
        if (this.state.habitsList.length) {
            let daysOfTheWeek = [' ', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let monthsOfTheYear = [' ', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            var allHabitsOverview = this.state.habitsList.map((e, i) => {
                e.date = e.dateformatted.split('/');
                let day = daysOfTheWeek[(+e.date[3]) + 1];
                let month = monthsOfTheYear[(+e.date[1]) + 1].substring(0, 3);
                if (day === "Tuesday" || day === "Thursday") {
                    day = day.substring(0, 4);
                } else {
                    day = day.substring(0, 3);
                }
                return (
                    <div key={i} className="habits-sidebar-habit-item">
                        <button onClick={() => this.showHabitDetail(e.id)} className="habits-sidebar-habit">
                            <p className="habit-sidebar-text">{e.title} <br /> Started: {`${day}`}{`${month} ${e.date[2]}, ${e.date[0]}`}</p>
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
                    let targetDiv = (<div key={i} className="habits-detail-bottom-items"><p className="habits-detail-bottom-days-ago">{i} days ago</p>
                        {this.state.habitEventsReturned &&
                            this.state.habitEvents.filter((e) => e.daysfromstart === `${i}`)[0] ?
                            <i className="far fa-check-circle habit-green-button"></i> // habit was completed that day
                            : // habit was not completed that day
                            <i className="far fa-times-circle habit-red-button"></i>}
                    </div>);
                    habitEventDivs.push(targetDiv)
                }
                var streak = habitEventDivs.every((e) => e.props.children[1].props.className.includes('habit-green-button')) ? <p className="streak">You're on a roll! Keep it up!</p> : null

                return (
                    <div>

                        <div key={i} className="habits-detail-habit">
                            <div className="habit-detail-top">
                                <h1>{e.title}</h1>
                                <h3 className="habits-detail-description">{e.description}</h3>
                                <p>Habit Category: {e.type === "Personal" ? 'Personal' : e.type === "Professional" ? 'Professional' : 'Health/Fitness'}</p>
                            </div>
                            <div>
                                <div style={{ textAlign: 'center' }}>

                                    <p>You started tracking this habit: <br />
                                        {
                                            moment([+e.date[0], (+e.date[1]), +e.date[2]]).fromNow().includes('hours')
                                                ?
                                                "Today"
                                                :
                                                `${day}, ${month} ${e.date[2]}, ${e.date[0]}, ${moment([+e.date[0], (+e.date[1]), +e.date[2]]).fromNow()}`
                                        }</p>
                                    <p>Here's your progress for the past week: </p>
                                    <img src={trash} className="delete-habit" onMouseDown={this.toggleDeleteConfirmation} />
                                    <div style={{ display: this.state.deleteConfirmationOpen ? 'block' : 'none' }} className="delete-habit-confirm">
                                        <p>Are you sure you want to delete this Habit?</p>
                                        <p onMouseDown={(id) => this.deleteHabit(e.id)}>Yes</p>
                                        <p onMouseDown={this.toggleDeleteConfirmation}>No</p>
                                    </div>
                                </div>
                                <div className="habits-detail-bottom">
                                    {habitEventDivs}
                                    <div className="habits-detail-bottom-items"><p className="habits-detail-bottom-days-ago">yest.</p>
                                        {this.state.habitEventsReturned && // checks that habitEvents array has been returned
                                            this.state.habitEvents.filter((e) => e.daysfromstart === "1")[0] ? // checks that first item in habitEvents {x} days ago is true
                                            <i className="far fa-check-circle habit-green-button"></i> // rendered if true
                                            : // if false 
                                            <i className="far fa-times-circle habit-red-button"></i>}
                                    </div>
                                    <div className="habits-detail-bottom-items"><p className="habits-detail-bottom-days-ago">today</p>
                                        {this.state.habitEventsReturned && this.props.completed.length && // checks that habitEvents array has been returned
                                            this.props.completed.map((elem, i) => {
                                                if (elem.id === e.id) {
                                                    if (elem.completed) {
                                                        return <i key={i} id={e.id} className="far fa-check-circle habit-green-button"></i>
                                                    } else {
                                                        return <i key={i} id={e.id} className="far fa-times-circle habit-red-button" onMouseDown={(habitId) => this.addHabitEvent(e.id)}></i>
                                                    }
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                {streak}
                            </div>
                        </div>
                    </div>
                );
            })
            // -----------------------------------------------------------------------------
        }

        var todaysHabits;
        if (this.props.completed && this.props.completed.length) {
            todaysHabits = this.props.completed.map((e) => {
                // console.log(e);
                if (e.completed) {
                    return <i className="far fa-check-circle habit-green-button habit-sidebar-button"></i>
                } else {
                    return <i className="far fa-check-circle habit-quick-check habit-sidebar-button" onMouseDown={(habitId) => this.addHabitEvent(e.id)}></i>
                }
            })
        }
        return (
            <div>
                {this.props.quickView ?
                    <HabitQuickMenu habitsCompletedToday={this.state.habitsCompletedToday} addHabitEvent={this.addHabitEvent} habitsQuickViewToggler={this.props.habitsQuickViewToggler} />
                    :
                    <div>
                        {!this.state.shouldLoadingDisplay ?
                            <div>
                                <div className="quick-view-button-cover"></div>
                                <div className="content-container">
                                    <div className="habits-sidebar">
                                        <div className="habits-sidebar-habit">
                                            {allHabitsOverview}
                                        </div>
                                        <div className="habits-sidebar-buttons">
                                            {todaysHabits}
                                        </div>
                                    </div>
                                    {!this.state.habitsList.length ?
                                        <div className="habits-content" >
                                            {
                                                this.state.addHabitVisible ?
                                                    <div>
                                                        <div onClick={this.toggleForm} className="add-habit-background">
                                                        </div>
                                                        <AddHabitForm
                                                            habitsList={this.state.habitsList}
                                                            currentUser={this.props.user}
                                                            toggleForm={this.toggleForm}
                                                            addHabitToList={this.addHabitToList}
                                                            getUpdatedHabitsByUser={this.getUpdatedHabitsByUser}
                                                            getTodaysHabits={this.getTodaysHabits} />
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
                                                <div style={{ height: '100%' }}>
                                                    <img src={add} onMouseDown={this.toggleForm} className="add-habit-button" />
                                                    {allHabitsDetail}
                                                    {this.state.addHabitVisible &&
                                                        <div>
                                                            <div onClick={this.toggleForm} className="add-habit-background">
                                                            </div>
                                                            <AddHabitForm
                                                                habitsList={this.state.habitsList}
                                                                currentUser={this.props.user}
                                                                toggleForm={this.toggleForm}
                                                                addHabitToList={this.addHabitToList}
                                                                getUpdatedHabitsByUser={this.getUpdatedHabitsByUser}
                                                                getTodaysHabits={this.getTodaysHabits} />
                                                        </div>}
                                                </div>
                                                :
                                                <div>
                                                    <img src={add} onMouseDown={this.toggleForm} className="add-habit-button" />
                                                    <div className="habit-detail-none-shown">
                                                        <h1>Welcome back {this.props.user.firstname}</h1>
                                                        <h3>Select a habit to view analytics</h3>
                                                    </div>
                                                    {this.state.addHabitVisible &&
                                                        <div>
                                                            <div onClick={this.toggleForm} className="add-habit-background">
                                                            </div>
                                                            <AddHabitForm
                                                                habitsList={this.state.habitsList}
                                                                currentUser={this.props.user}
                                                                toggleForm={this.toggleForm}
                                                                addHabitToList={this.addHabitToList}
                                                                getUpdatedHabitsByUser={this.getUpdatedHabitsByUser}
                                                                getTodaysHabits={this.getTodaysHabits} />
                                                        </div>}
                                                </div>}
                                        </div>
                                    }
                                </div>
                            </div>
                            :
                            <img src={loading} style={{ position: 'absolute', top: '37%', left: '45%', right: '45%', bottom: '37%' }} />
                        }
                    </div>
                }
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data,
        completed: state.habits.completed
    }
}

export default connect(mapStateToProps, { getCurrentUser, updateHabitsCompletedToday })(Habits);