import React, { Component } from 'react';
import axios from 'axios';
import * as moment from 'moment';

import './Habits.css'

const add = require('../../assets/plus.png')

export default class AddHabitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      type: '',
    }
  }

  handleTitleInput = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  handleDescriptionInput = (e) => {
    this.setState({
      description: e.target.value
    })
  }
  handleTypeInput = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  addHabit = (e) => {
    e.preventDefault();
    let { title, description, type } = this.state;
    let dateFormatted = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}/${new Date().getDay()}`
    let date = new moment(new Date()).format('DDD, Y')
    let habit = { userId: this.props.currentUser.id, title, description, dateFormatted, date, type };
    title ? description ?
      axios.post('/api/habits', habit).then(result => {
        this.props.addHabitToList(result.data);
        this.setState({
          title: '',
          description: '',
          type: ''
        })
      })
      :
      alert('please enter a description') // toast
      :
      alert('please enter a title') // toast
  }

  render() {
    console.log(this.state);
    return (
      <div className="add-habit">
        <img src={add} onMouseDown={this.props.toggleForm} className="add-habit-close-form" />
        <form onSubmit={this.addHabit} className="add-habit-form">
          <input onChange={this.handleTitleInput} placeholder="TITLE" value={this.state.title} maxlength="15"/>
          <textarea onChange={this.handleDescriptionInput} type="submit text" placeholder='Description' value={this.state.description} rows="4" cols="30"><input /></textarea>
          Category: <select value={this.state.type} onChange={this.handleTypeInput} type="submit" className="add-habit-form-select">
            <option value="Health/Fitness">Health/Fitness</option>
            <option value="Professional">Professional</option>
            <option value="Personal">Personal</option>
          </select>
          <button type="submit">Add Habit</button>
        </form>
      </div>
    )
  }
}