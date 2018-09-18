import React, { Component } from 'react';
import './todo.css'

export default class Notes extends Component {
    constructor() {
        super();
        this.state = {
            todos: ''
        }
    }

    render() {
        return (
            <div className="content-container">
                Todo
            </div>
        )
    }
}