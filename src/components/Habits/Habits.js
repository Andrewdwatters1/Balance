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
            addHabitVisible: false
        }
    }

    toggleForm = () => {
        this.setState({
            addHabitVisible: !this.state.addHabitVisible
        })
    }
    addHabitToList = (arr) => {
        this.setState({
            habitsList: arr
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
        if(this.state.habitsList.length) {
            let monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var allHabits = this.state.habitsList.map((e, i) => {
                e.date = e.startdateformatted.split('/');
                let month = monthsOfTheYear[e.date[1]];
                return (
                    <div key={i} className="habits-sidebar-habit">
                        <p>{e.title}</p>
                        <p>{`${month} ${e.date[2]}, ${e.date[0]}`}</p>
                    </div>
                )
            })
        }
        return (
            <div className="content-container">
                <div className="habits-sidebar">
                    {allHabits}
                </div>
                {
                    !this.state.habitsList.length ?
                        // displayed if current user has no habits
                        <div className="habits-content">
                            <img src={add} onMouseDown={this.toggleForm} className="add-habit-button" />
                            <p>Looks like you aren't tracking any habits yet. <br/><br/> Add one above! </p>
                            {
                                this.state.addHabitVisible ?
                                    <AddHabitForm habitsList={this.state.habitsList} currentUser={this.props.user} toggleForm={this.toggleForm} addHabitToList={this.addHabitToList}/>
                                    :
                                    null
                            }
                        </div>
                        :
                        // displayed when user has habits
                        <div className="habits-content">
                            <img src={add} onMouseDown={this.toggleForm} className="add-habit-button" />
                            <p>habit detail view here</p>
                            {
                                this.state.addHabitVisible ?
                                    <AddHabitForm habitsList={this.state.habitsList} currentUser={this.props.user} toggleForm={this.toggleForm} addHabitToList={this.addHabitToList}/>
                                    :
                                    null
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