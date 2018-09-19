import React, { Component } from 'react';
import axios from 'axios';

import './Habits.css'

const add = require('../../assets/plus.png')

export default class AddHabitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
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

  addHabit = (e) => {
    e.preventDefault();
    let { title, description } = this.state;
    let startdate = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
    let habit = { userId: this.props.currentUser.id, title, description, startdate };
    title ? description ?
      axios.post('/api/habits', habit).then(result => {
        this.props.addHabitToList(result.data);
      })
      :
      alert('please enter a description') // toast
      :
      alert('please enter a title') // toast
      this.setState({
        title: '',
        description: ''
      })
  }

  render() {
    console.log(this.props);
    return (
      <div className="add-habit">
        <img src={add} onMouseDown={this.props.toggleForm} className="add-habit-close-form" />
        <form onSubmit={this.addHabit} className="add-habit-form">
          <input onChange={this.handleTitleInput} placeholder="TITLE" value={this.state.title} />
          <textarea onChange={this.handleDescriptionInput} placeholder='Description' value={this.state.description} rows="4" cols="30"><input /></textarea>
          <button type="submit">Add Habit</button>
        </form>
      </div>
    )
  }
}

