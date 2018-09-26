import React, { Component } from 'react';
import Note from './Note';
import {connect} from 'react-redux';
import {getNotes, addNotes, addScratchPad, getScratchPad, editNotes} from '../../redux/reducers/notepad';
import axios from 'axios'
import './Notes.css';

import ScratchPad from './ScratchPad';

class NotePad extends Component{
    constructor(props){
        super(props);
        this.state={
            title: 'note.content',
            date:'',
            content:'',
            RenderedNote: {
                title:'',
                date:'',
                content:''
            },
            edit: true,

            isSingleNoteVisible: false,
            isScratchPadVisible: true,
            isAddNoteVisible: false,

            date: new Date(),
        }
    }

    getTimeString() {
        const date = new Date(Date.now()).toLocaleTimeString();
        return date;
    }

    scratchPadToggler = () => {
        this.setState({
            isScratchPadVisible: true,
            isSingleNoteVisible: false,
            isAddNoteVisible: false,
        })
    }
    singleNoteToggler = (note) => {
        this.setState({
            RenderedNote: note, 
            isScratchPadVisible: false,
            isSingleNoteVisible: true,
            isAddNoteVisible: false,
        })
    }
    addNoteToggler = () => {
        this.setState({
            isScratchPadVisible: false,
            isSingleNoteVisible: false,
            isAddNoteVisible: true,
        })
    }
    handleTitle = (e) => {
        this.setState({RenderedNote: {...this.state.RenderedNote, title: e.target.value}})
    }
      
    handleContent = (e) => {
        this.setState({RenderedNote: {...this.state.RenderedNote, content: e.target.value}})
    }

    handleNewTitle = (e) => {
        this.setState({title: e.target.value})
    }

    handleNewContent = (e) => {
        this.setState({content: e.target.value})
    }

    componentDidMount(){
        this.props.getNotes()
        this.props.getScratchPad()
    }
    
    updateNotes = (notes) => {
       return notes
    }

    updateScratchPad = (scratchpad) => {
        return scratchpad
    }

    saveUpdatedNote = (id) => {
        let obj = {
            date: '',
            title: this.state.RenderedNote.title,
            content: this.state.RenderedNote.content,
        }
            axios.put(`/api/notepad/${this.state.RenderedNote.id}`, obj).then(results=> {
                // console.log('results', results.data)
                this.props.editNotes(results.data)
            })
        }
    

    render(){

        const  {title, date, content} = this.state
        const newNote = { title, date, content } 
            console.log(this.props)    
        let notePad = this.props.notePad.map(notes => {
            return <Note key={notes.id}
                    note={notes}
                    updatedNotes={this.updatedNotes}
                    singleNoteToggler={this.singleNoteToggler}
                    handleContent={this.handleContent}
                    handleTitle={this.handleTitle}/>
        })
        const NewScratch = { title, date, content }

        console.log('scratchpad', this.props.scratchPad)
        let scratchPad = this.props.scratchPad.map(scratch => {
            return <ScratchPad key={scratch.id}
                                scratch={scratch}
                                updatedScratchPad={this.updatedScratchPad}/>
        })


        
        let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let dayNumber = this.state.date.getDay();
        let day = daysOfTheWeek[dayNumber];

        let monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let monthNumber = this.state.date.getMonth();
        let month = monthsOfTheYear[monthNumber];
        return(
            <div className="content-container">
                <div className="notes-container">
                    <h2>Note Pad</h2>
                        <button className="note-buttons" onClick={this.scratchPadToggler}>Scratch Pad</button>
                        <button className="note-buttons" onClick={this.addNoteToggler}>Add A New Note(note pad)</button>
                    {notePad}    
                </div>
                <div className="scratchpad">
                    {this.state.isSingleNoteVisible && 
                    <div>
                        {this.state.RenderedNote.date}
                       <input className="note-buttons" value={this.state.RenderedNote.title} onChange={this.handleTitle}/>
                        <textarea className="note-buttons" value={this.state.RenderedNote.content} onChange={this.handleContent}/>
                 <button className= "note-buttons" onClick={()=> this.saveUpdatedNote(this.state.RenderedNote.id)}>Save</button>

                    </div> }
                    {this.state.isScratchPadVisible && 
                    <div>
                        <h5> 
                            <span>{day}, </span>
                            <span>{month} </span>
                            <span>{this.state.date.getDate()} </span>
                            <span>{this.state.date.getFullYear()}</span>
                        </h5>
                        <input placeholder='title' value={this.state.title} onChange={this.handleNewTitle}></input>
                        <textarea placeholder='content' value={this.state.content} onChange={this.handleNewContent}/>
                        <button className="note-buttons" onClick={() => this.props.addScratchPad(NewScratch)}>Save to Scratch Pad</button>
                        {scratchPad}
                    </div>
                    }
                    {this.state.isAddNoteVisible &&
                    <div>
                        <h5> 
                            <span>{day}, </span>
                            <span>{month} </span>
                            <span>{this.state.date.getDate()} </span>
                            <span>{this.state.date.getFullYear()}</span>
                        </h5>
                        <input placeholder='title' value={this.state.title} onChange={this.handleNewTitle}></input>
                        <textarea placeholder='content' value={this.state.content} onChange={this.handleNewContent}/>
                        <button className="note-buttons" onClick={() => this.props.addNotes(newNote)}>Save Note</button>
                    </div>
                    }
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      notePad: state.notepad.notePad,
    scratchPad: state.notepad.scratchPad
    }
  }
  
export default connect(mapStateToProps,{getNotes, addNotes, addScratchPad, getScratchPad, editNotes})(NotePad)

{/* <h3 className="add-event-submit" onClick={()=>this.eventUpdaterSubmit(event.event_id)}>Update Event</h3> */}
