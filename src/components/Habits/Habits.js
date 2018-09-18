// external imports
import React, { Component } from 'react';
import axios from 'axios';

// local imports
import './Habits.css'


export default class Habits extends Component {
    constructor() {
        super();
        this.state = {
            habitsList: [],

        }
    }

    componentDidMount() {
        // pull the userId off of session
        console.log(this.session);
        axios.get('/api/habits', {userId: 7}).then(result => {
            this.setState({
                habitsList: result.data
            })
        })
    }


    render() {
        let habitsOverviewList = this.state.habitsList.map((e) => {
            return 
            <div>
                <p>{e.title}</p>
                <p>{e.startdate}</p>
            </div>
        })
        return (
            <div className="content-container">
                <div className="habits-sidebar">
                    {habitsOverviewList}
                </div>
                <div className="habits-content">
                    Content
                </div>
            </div>
        )
    }
}