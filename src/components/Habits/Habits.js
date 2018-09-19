import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './Habits.css'
import { getCurrentUser } from '../../redux/reducers/user';


class Habits extends Component {
    constructor() {
        super();
        this.state = {
            habitsList: [],

        }
    }

    componentDidMount() {
        this.props.getCurrentUser();
        axios.get('/api/habits', { userId: 7 }).then(result => {
            this.setState({
                habitsList: result.data
            })
        })
    }


    render() {
        console.log(this.state.habitsList);
        console.log('current user is: ', this.props.user);
        let habitsOverviewList = this.state.habitsList.map((e) => {
            return
            <div>
                <p>{e.title}</p>
                <p>{e.startdate}</p>
            </div>
        })
        return (
            <div className="content-container">
                {
                    this.state.habitsList.length ?
                        <div className="habits-sidebar">
                            {habitsOverviewList}
                        </div>
                        :
                        null
                }
                <div className="habits-content">
                    Content
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getCurrentUser })(Habits);