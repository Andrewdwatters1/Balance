import React, { Component } from 'react';
import Note from './Note';
import {connect} from 'react-redux';
import {getNotes} from '../../redux/reducers/notepad';
import axios from 'axios';
import './Notes.css';

class NotePad extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            date:'',
            content:'',
            notePad: []
        }
    }

    handleTitle = (e) => {
        this.setState({title: e.target.value})
      }
      handleDate = (e) => {
        this.setState({date: e.target.value})
      }
      handleContent = (e) => {
        this.setState({content: e.target.value})
      }

      addNote = () => {
        const  {title, date, content} = this.state
        const newNote = { title, date, content } 
        axios.post('/api/notes', newNote).then(results => {
            let newNotes = [...this.props.notePad] 
            newNotes.push(results.data)
        })
    }

    componentDidMount(){
        this.props.getNotes()
      }
    
      updateNotes = (notes) => {
        return notes
      }

    render(){
        let {note} = this.props
            console.log(this.props)
        let notePad = this.state.notePad.map(notes => {
            return <Note key={notes.id}
                    updatedNotes={this.updatedNotes}/>
        })
        return(
            <div className="content-container">
            <h2>Notes</h2>
                <div>
                <h1>Add A New Note</h1>
                    <input placeholder='title' value={this.state.title} onChange={this.handleTitle}></input>
                    <input placeholder='date' value={this.state.date} onChange={this.handleDate}></input>
                    <textarea placeholder='content' value={this.state.content} onChange={this.handleContent}/>
                    <button onClick={() => this.addNote()}>Save Note</button>
                </div>
                    {notePad}    
                <div>
                    {/* <textarea className="scratchpad"/> */}
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      notePad: state.NotePad
    }
  }
  
  export default connect(mapStateToProps,{getNotes})(NotePad)