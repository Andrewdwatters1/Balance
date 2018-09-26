import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../redux/reducers/user'
import axios from 'axios';

import './Weather.css'

//Images

const sunny = require('../../assets/sunny.png')



class Weather extends Component {
    constructor(props){
        super(props);
        this.state={

            //Current Info on State
            userZipCode: this.props.user.zipcode,
            userLat: "",
            userLong: "",
            userCityName: "",
            currentTemperature: "",
            cityName: "",
            icon: "",
            currentWeather: "",

            //Forecast Info on State
            // Today = 0, Tomorrow = 1...etc

            dailyHi0: "",
            dailyLow0: "",
            dailyMoonPhase0: "",
            //currentWeather: "",
            //icon: "",

            dailyHi1: "",
            dailyLow1: "",
            dailyMoonPhase1: "",
            dailyWeather1: "",
            dailyWeatherIcon1: "",

            dailyHi2: "",
            dailyLow2: "",
            dailyMoonPhase2: "",
            dailyWeather2: "",
            dailyWeatherIcon2: "",

            dailyHi3: "",
            dailyLow3: "",
            dailyMoonPhase3: "",
            dailyWeather3: "",
            dailyWeatherIcon3: "",

            dailyHi4: "",
            dailyLow4: "",
            dailyMoonPhase4: "",
            dailyWeather4: "",
            dailyWeatherIcon4: "",

            dailyHi5: "",
            dailyLow5: "",
            dailyMoonPhase5: "",
            dailyWeather5: "",
            dailyWeatherIcon5: "",

            dailyHi6: "",
            dailyLow6: "",
            dailyMoonPhase6: "",
            dailyWeather6: "",
            dailyWeatherIcon6: ""

        }
    }

      componentDidMount() {
          axios.get(`https://www.zipcodeapi.com/rest/${process.env.REACT_APP_ZIPCODEAPI_KEY}/info.json/${this.state.userZipCode}/degrees`).then(results => {
              this.setState({
                userLat: results.body.lat,
                userLong: results.body.lng,
                userCityName: results.body.city,
              })
      }
    )}

    render(){
        return(
            <div className="weather-box">
                {/* <div>
                <img src={this.state.icon}/>
                <div style={{width: "5px"}}></div>
                <h1>{this.state.temperature}°</h1>
                </div>
                <p>SALT LAKE CITY</p> */}

                <p>{this.state.userZipCode}</p>
                <p>{this.state.userLat}</p>
                <p>{this.state.userLong}</p>
                <p>{this.state.userCityName}</p>

            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getCurrentUser })(Weather);


// users zip code must be converted to approx longitude and latitude for API call
// we will do this using https://www.zipcodeapi.com/API
// my key for zipcodeapi is: JhahyV2qQGBUAgrE3mqP6TMzWERaPRduGy2cbzgzszC0Ss6VaP3fVVNUuoa9rlod
// zip code or long lat must be convereted to city
// hide key in environmental vars
// api request: https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// key:6821c76169ff1c41fb0e02a117de537a
// when request comes back, grab currently info for display
// this includes icon for icon and 
// create icons for icon indicators
// trunc temperature for display
// onClick show forecast - daily has temp hi and low
// timestamp is in unix time, convert to determine date.
// icons for moon phases (no moon, crescent, half, 3/4(), full)
// display which day of the week and date in forecast