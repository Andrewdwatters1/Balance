import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'



class HomeEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        let date1 =moment(new Date()).format("YYYY/MM/DD")
        let date2 =moment(moment(new Date()).add(7, 'd').format('YYYY/MM/DD'))._i
        let date3 =moment(moment(new Date()).add(1,'d').format("YYYY/MM/DD") )._i
        axios.get(`/api/eventdates?event_date1=${date1}&event_date2=${date2}&event_date3=${date3}`).then(response => {
            this.setState({
                events: response.data
            })
        })
    }

    render(){

        let upcomingEvents = this.state.events.map(event => {
            function importance(string){
            let importance = "#FFA500";
            if(string === 'lo'){importance = "#FAFAFA"}
            return importance}

            return (

            <div className="upcoming-events-div">
                <span className="event-date">{event.event_formatted_date}</span>
                <span className="event-time">{moment(event.event_time, "HH:mm:ss").format("h:mm A")}</span>
                <span style={{color: `${importance(event.event_importance)}`}} className="event-name">{event.event_name}</span>
            </div>

            )
        })
        
        return(
            <div>
            {upcomingEvents}
            </div>
        )
    }
}

export default HomeEvents;