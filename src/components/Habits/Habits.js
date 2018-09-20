import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
            habitDetailShown: 1
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
        this.setState({
            habitDetailVisible: true,
            habitDetailShown: id,
            addHabitVisible: false,
        })
    }

    componentDidMount() {
        this.props.getCurrentUser();
        axios.get('api/habits', { id: this.props.user.id }).then(result => {
            this.setState({
                habitsList: result.data
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
                            <p>{e.title}</p>
                            <p>Started: {`${day}, ${month} ${e.date[2]}, ${e.date[0]}`}</p>
                        </button>
                    </div>
                )
            })
            var allHabitsDetail = this.state.habitsList.filter((e) => e.id === this.state.habitDetailShown).map((e, i) => {
                e.date = e.dateformatted.split('/');
                let day = daysOfTheWeek[(+e.date[3]) + 1];
                let month = monthsOfTheYear[(+e.date[1]) + 1];
                return (
                    <div key={i} className="habits-detail-habit">
                        <h3>{e.title}</h3>
                        <p>{e.description}</p>
                        {e.type === "Personal" ? <i class="fas fa-book-reader"></i> : e.type === "Professional" ? <i class="fas fa-user-tie"></i> : <i class="fas fa-heartbeat"></i>}
                        <p>You started tracking this habit on {`${day}, ${month} ${e.date[2]}, ${e.date[0]}`}</p>
                        <p>Here's your progress for the past week: </p>
                        <button style={{color: 'black'}}>done</button>
                    </div>
                )
            })
        }

        return (
            <div className="content-container">
                {/* HABITS SIDEBAR */}
                <div className="habits-sidebar">
                    {allHabitsOverview}
                </div>
                {
                    !this.state.habitsList.length ?

                        // USER DOES NOT HAVE ANY HABITS
                        <div className="habits-content">
                            {
                                this.state.addHabitVisible ?
                                    <AddHabitForm habitsList={this.state.habitsList} currentUser={this.props.user}/**/ toggleForm={this.toggleForm} addHabitToList={this.addHabitToList} />
                                    :
                                    <div className="add-first-habit-button">
                                        <img src={add} onMouseDown={this.toggleForm} className="add-first-habit-plus" />
                                        <p>Add your first habit!</p>
                                    </div>
                            }
                        </div>
                        :
                        <div className="habits-content">
                            {
                                this.state.habitDetailVisible ?

                                    // USER HAS HABITS, SHOWS DETAIL VIEW
                                    <div>
                                        <img src={add} onMouseDown={this.toggleForm} className="add-habit-button" />
                                        <div>
                                            {allHabitsDetail}
                                        </div>
                                        {
                                            this.state.addHabitVisible ?
                                                <AddHabitForm habitsList={this.state.habitsList} currentUser={this.props.user} toggleForm={this.toggleForm} addHabitToList={this.addHabitToList} />
                                                :
                                                null
                                        }
                                    </div>
                                    :

                                    // USER HAS HABITS, NO DETAIL VIEW
                                    <div>
                                        <img src={add} onMouseDown={this.toggleForm} className="add-habit-button" />
                                        <div>
                                            <p>user has habits, hasn't selected one</p>
                                        </div>
                                        {
                                            this.state.addHabitVisible ?
                                                <AddHabitForm habitsList={this.state.habitsList} currentUser={this.props.user} toggleForm={this.toggleForm} addHabitToList={this.addHabitToList} />
                                                :
                                                null
                                        }
                                    </div>
                            }
                        </div>

                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getCurrentUser })(Habits);