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
        // axios.get('/api/habits', { userId: 7 }).then(result => {
        //     this.setState({
        //         habitsList: result.data
        //     })
        // })
    }


    render() {
        console.log(this.props.user)
        return (
            <div className="content-container">
                {
                    this.state.habitsList.length ?
                        <div className="habits-sidebar">
                            {/* {habitsOverviewList} */}
                            <p>s</p>
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