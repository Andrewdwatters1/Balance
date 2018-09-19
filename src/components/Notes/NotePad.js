import React, { Component } from 'react';
import Note from './Note';
import {connect} from 'react-redux';
import {getNotes, addNotes} from '../../redux/reducers/notepad';
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

    //   addNote = () => {
    //     const  {title, date, content} = this.state
    //     const newNote = { title, date, content } 
    //     this.
        // axios.post('/api/notepad', newNote).then(results => {
        //     let newNotes = [...this.props.notePad] 
        //     newNotes.push(results.data)

        // })
    //}

    componentDidMount(){
        this.props.getNotes()
      }
    
      updateNotes = (notes) => {
        return notes
      }

    render(){
        let {note} = this.props
        const  {title, date, content} = this.state
        const newNote = { title, date, content } 
            console.log(this.props)
        let notePad = this.props.notePad.map(notes => {
            return <Note key={notes.id}
                    note={notes}
                    updatedNotes={this.updatedNotes}/>
        })
        return(
            <div className="content-container">
                <div className="notes-container">
                    <h2>Notes</h2>
                    <h3>Add A New Note</h3>
                        <input placeholder='title' value={this.state.title} onChange={this.handleTitle}></input>
                        {/* <input placeholder='date' value={this.state.date} onChange={this.handleDate}></input> */}
                        <textarea placeholder='content' value={this.state.content} onChange={this.handleContent}/>
                    <   button onClick={() => this.props.addNotes(newNote)}>Save Note</button>
                        {notePad}    
                </div>
                <div>
                    <textarea className="scratchpad"/>
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      notePad: state.notepad.notePad
    }
  }
  
  export default connect(mapStateToProps,{getNotes, addNotes})(NotePad)