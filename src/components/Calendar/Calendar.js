import React, { Component } from 'react';
import './Calendar.css'

export default class Calendar extends Component{
    constructor(){
        super();
        this.state={
            calendar: ''
        }
    }

    render(){
        return(
            <div className="content-container">
            </div>
        )
    }
}