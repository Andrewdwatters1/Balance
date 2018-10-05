import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateHabitsCompletedToday } from '../../redux/reducers/habits';
import './Habits.css'

class HabitQuickMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userHabits: []
    }
  }
  componentDidMount() {
    this.props.updateHabitsCompletedToday(this.props.habitsCompletedToday)
    axios.get('api/habits').then(result => {
      this.setState({
        userHabits: result.data.map((e) => e = e.title)
      })
    })
  }
  render() {
    let renderedItem = [];
    if (this.props.completed.length) {
      for (let i = 0; i < this.state.userHabits.length; i++) {
        console.log(this.props.completed[i]);
        renderedItem.push({
          habit: this.state.userHabits[i],
          completed: this.props.completed[i].completed,
          id: this.props.completed[i].id
        })
      }
    }
    return (
      <div className="habits-quick-menu" onMouseLeave={this.props.habitsQuickViewToggler}>
        {renderedItem.map((e, i) => {
          return (
            <div className="habits-quick-menu-item" key={i}>
              <p>{e.habit}</p>
              {e.completed ?
                <i className="far fa-check-circle habit-green-button habits-buttons-small"></i>
                :
                <i className="far fa-check-circle habit-quick-check habits-buttons-small" onMouseDown={(habitId) => this.props.addHabitEvent(e.id)}></i>}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    completed: state.habits.completed
  }
}

export default connect(mapStateToProps, { updateHabitsCompletedToday })(HabitQuickMenu)