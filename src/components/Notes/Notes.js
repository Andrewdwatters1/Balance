import React, { Component } from 'react';
import './Notes.css'

export default class Notes extends Component{
    constructor(){
        super();
        this.state={
            notes: ''
        }
    }

    render(){
        return(
            <div className="content-container">
            Notes
            </div>
        )
    }
}