import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../redux/reducers/user'
import { getWeatherInfo } from '../../redux/reducers/weather'
import axios from 'axios';
// import Geolocation from "react-geolocation";

import './Weather.css'

//Images

const sunny = require('../../assets/sunny.png')


//IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Note: You are required to display the link “Powered by Dark Sky” somewhere prominent in your app or service.
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
            icon: "",
            currentWeather: "",

            //Forecast Info on State
            // Today = 0, Tomorrow = 1...etc
            todayHiTemp: "",
            todayLowTemp: "",
            todayMoonPhase: "",

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
                this.props.getWeatherInfo(this.state.userLat, this.state.userLng).then(result => {
                    // console.log(result)
                    let { currently } = result.value.data;
                    let { data } = result.value.data.daily;
                    this.setState({
                        currentTemperature: currently.temperature,
                        icon: currently.icon,
                        currentWeather: currently.summary,
                        todayHiTemp: data[0].apparentTemperatureHigh,
                        todayLowTemp: data[0].apparentTemperatureLow,
                        todayMoonPhase: data[0].moonPhase,

                        dailyHi1: data[1].apparentTemperatureHigh,
                        dailyLow1: data[1].apparentTemperatureLow,
                        dailyMoonPhase1: data[1].moonPhase,
                        dailyWeather1: data[1].summary,
                        dailyWeatherIcon1: data[1].icon,

                        dailyHi2: data[2].apparentTemperatureHigh,
                        dailyLow2: data[2].apparentTemperatureLow,
                        dailyMoonPhase2: data[2].moonPhase,
                        dailyWeather2: data[2].summary,
                        dailyWeatherIcon2: data[2].icon,

                        dailyHi3: data[3].apparentTemperatureHigh,
                        dailyLow3: data[3].apparentTemperatureLow,
                        dailyMoonPhase3: data[3].moonPhase,
                        dailyWeather3: data[3].summary,
                        dailyWeatherIcon3: data[3].icon,

                        dailyHi4: data[4].apparentTemperatureHigh,
                        dailyLow4: data[4].apparentTemperatureLow,
                        dailyMoonPhase4: data[4].moonPhase,
                        dailyWeather4: data[4].summary,
                        dailyWeatherIcon4: data[4].icon,

                        dailyHi5: data[5].apparentTemperatureHigh,
                        dailyLow5: data[5].apparentTemperatureLow,
                        dailyMoonPhase5: data[5].moonPhase,
                        dailyWeather5: data[5].summary,
                        dailyWeatherIcon5: data[5].icon,

                        dailyHi6: data[6].apparentTemperatureHigh,
                        dailyLow6: data[6].apparentTemperatureLow,
                        dailyMoonPhase6: data[6].moonPhase,
                        dailyWeather6: data[6].summary,
                        dailyWeatherIcon6: data[6].icon,
                    })
                })
            })
        })
    }


    render() {
        // console.log(this.state);

        return (
            <div className="weather-box" onClick={this.weatherModalToggler}>

                {this.state.icon === 'rain' ? <p>🌧</p>
                    : this.state.icon === 'clear-day' ? <p>☀️</p>
                        : this.state.icon === 'clear-night' ? <p>🌙</p>
                            : this.state.icon === 'snow' ? <p>🌨</p>
                                : this.state.icon === 'sleet' ? <p>🌧</p>
                                    : this.state.icon === 'wind' ? <p>💨</p>
                                        : this.state.icon === 'fog' ? <p></p>
                                            : this.state.icon === 'cloudy' ? <i class="fas fa-sad-cry"></i>
                                                : this.state.icon === 'partly-cloudy-day' ? <i class="fas fa-sad-cry"></i>
                                                    : this.state.icon === 'partly-cloudy-night' ? <i class="fas fa-sad-cry"></i>
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

export default connect(mapStateToProps, { getCurrentUser, getWeatherInfo })(Weather);


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