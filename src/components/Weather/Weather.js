import React, { Component } from 'react';
import './Weather.css'

//Images

const sunny = require('../../assets/sunny.png')

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            temperature: 77, //to be changed to "" and set by request to weather API
            location: "", //to be changed to "" and set by get request to user table, hopefully we can pull a city
            icon: sunny  //to be changed to null and set by function in componentDidMount API req
        }
    }

    //   componentDidMount() {
    
    //   }

    render(){
        return(
            <div className="weather-box">
                <div>
                <img src={this.state.icon}/>
                <div style={{width: "5px"}}></div>
                <h1>{this.state.temperature}°</h1>
                </div>
                <p>SALT LAKE CITY</p>
            </div>
        )
        
    }
}