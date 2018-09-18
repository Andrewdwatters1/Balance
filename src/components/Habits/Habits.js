import React, { Component } from 'react';
import './Habits.css'

export default class Habits extends Component {
    constructor() {
        super();
        this.state = {
            habits: ''
        }
    }

    render() {
        return (
            <div className="content-container">
                Habits
            </div>
        )
    }
}