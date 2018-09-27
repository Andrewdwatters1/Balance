import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../redux/reducers/user'
import axios from 'axios';
import Geolocation from "react-geolocation";

import './Weather.css'

//Images

const sunny = require('../../assets/sunny.png')


//IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Note: You are required to display the link "Powered by Dark Sky" somewhere prominent in your app or service.
// ^^^^^^^^^^BE SURE TO DO THIS IF WE PUT INTO PRODUCTION^^^^^^^^^^^^^^^^^^^^^

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //Current Info on State
            userZipCode: this.props.user.zipcode,
            userLat: "",
            userLng: "",
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
            dailyWeatherIcon6: "",

            isWeatherModalVisible: false
        }
    }


    weatherModalToggler = () => {
        this.setState({
            isWeatherModalVisible: !this.state.isWeatherModalVisible
        })
    }

    componentDidMount() {
        this.props.getCurrentUser()
        axios.get(`http://api.zippopotam.us/us/${this.state.userZipCode}`).then(results => {
            this.setState({
                userLat: results.data.places[0].latitude,
                userLng: results.data.places[0].longitude,
                userCityName: results.data.places[0]['place name'],
            }, () => {
                axios.get(`https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_KEY}/${this.state.userLat},${this.state.userLng}`).then(results => {
                    console.log(results)
                    this.setState({
                        currentTemperature: results.data.currently.temperature,
                        currentWeather: results.data.currently.icon,
                    })
                })
            })
        })
    }


    render() {
        console.log(this.state.currentWeather);

        return (
            <div className="weather-box" onClick={this.weatherModalToggler}>

                {this.state.currentWeather === 'rain' ? <p>🌧</p>
                    : this.state.currentWeather === 'clear-day' ? <p>☀️</p>
                        : this.state.currentWeather === 'clear-night' ? <p>🌙</p>
                            : this.state.currentWeather === 'snow' ? <p>🌨</p>
                                : this.state.currentWeather === 'sleet' ? <p>🌧</p>
                                    : this.state.currentWeather === 'wind' ? <p>💨</p>
                                        : this.state.currentWeather === 'fog' ? <p></p>
                                            : this.state.currentWeather === 'cloudy' ? <i class="fas fa-sad-cry"></i>
                                                : this.state.currentWeather === 'partly-cloudy-day' ? <i class="fas fa-sad-cry"></i>
                                                    : this.state.currentWeather === 'partly-cloudy-night' ? <i class="fas fa-sad-cry"></i>
                                                        : <i class="fas fa-sad-cry"></i>}
                {/* default case */}
                <p>{this.state.currentTemperature}{'\u00B0'}</p>
                <p>{this.state.userCityName}</p>
                {this.state.isWeatherModalVisible &&
                    <div className="weatherModalContainer">
                        <h1>weeklyforcast</h1>
                    </div>}
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