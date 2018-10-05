import React, { Component } from 'react';
import Note from './Note';
import { connect } from 'react-redux';
import { getNotes, addNotes, addScratchPad, getScratchPad, editNotes, deleteNotes } from '../../redux/reducers/notepad';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import './Notes.css';

import ScratchPad from './ScratchPad';
import { ClickAwayListener } from '../../../node_modules/@material-ui/core';
const add = require('../../assets/plus.png')

class NotePad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            content: '',
            RenderedNote: {
                title: '',
                date: '',
                content: ''
            },
            edit: true,
            scratchPadSaved: false,

            isSingleNoteVisible: false,
            isScratchPadVisible: true,
            isAddNoteVisible: false,

            isDelelteModalopen: false,

            date: new Date(),
        }
    }

    componentDidMount() {
        this.props.getNotes()
        this.props.getScratchPad()
        document.addEventListener('click', this.unmoutcallbackmethod)
    }

    componentWillUnmount(){
        // this.unmoutcallbackmethod()
        setTimeout(() => {
    document.removeEventListener('click', this.unmoutcallbackmethod)
        }, 150)
    }
    
    unmoutcallbackmethod = (e) =>{
        // return (e) => {
            if(!document.getElementById('content-outer') && !this.state.isScratchPadVisible) {
                this.saveUpdatedNote(this.state.RenderedNote.id)
            } else {
                console.log('note should not save')
            }
        // }
    }

    getTimeString() {
        const date = new Date(Date.now()).toLocaleTimeString();
        return date;
    }

    scratchPadToggler = () => {
        this.saveUpdatedNote(this.state.RenderedNote.id)
        this.setState({
            isScratchPadVisible: true,
            isSingleNoteVisible: false,
            isAddNoteVisible: false,
        })
    }
    singleNoteToggler = (note) => {
        this.saveUpdatedNote(this.state.RenderedNote.id)
        this.setState({
            RenderedNote: note,
            isScratchPadVisible: false,
            isSingleNoteVisible: true,
            isAddNoteVisible: false,
        })
    }
    addNoteToggler = () => {
        this.saveUpdatedNote(this.state.RenderedNote.id)
        this.setState({
            isScratchPadVisible: false,
            isSingleNoteVisible: false,
            isAddNoteVisible: true,
        })
    }

    deleteModalToggler = () => {
        this.setState({
            isDelelteModalopen: !this.state.isDelelteModalopen,
        })
    }
    handleTitle = (e) => {
        this.setState({ RenderedNote: { ...this.state.RenderedNote, title: e.target.value } })
    }

    handleContent = (e) => {
        this.setState({ RenderedNote: { ...this.state.RenderedNote, content: e.target.value } })
    }

    handleNewTitle = (e) => {
        this.setState({ title: e.target.value })
    }

    handleNewContent = (e) => {
        this.setState({ content: e.target.value })
    }

    eraseText = () => {
        this.setState({ content: '' });
        this.setState({ title: '' });

    }

    updateNotes = (notes) => {
        return notes
    }

    updateScratchPad = (scratchpad) => {
        return scratchpad
    }

    saveUpdatedNote = () => {
        console.log('hit')
        let obj = {
            date: '',
            title: this.state.RenderedNote.title,
            content: this.state.RenderedNote.content,
        }
        axios.put(`/api/notepad/${this.state.RenderedNote.id}`, obj).then(results => {
            // console.log('results', results.data)
            this.props.editNotes(results.data)
        })
        this.setState({
            scratchPadSaved: true
        })
    }

    textAreaAdjust(o) {
        o.style.height = "1px";
        o.style.height = (25 + o.scrollHeight) + "px";
    }


    render() {

        const { title, date, content } = this.state
        const newNote = { title, date, content }
        console.log(this.props)
        let notePad = this.props.notePad.map(notes => {
            return <Note key={notes.id}
                note={notes}
                updatedNotes={this.updatedNotes}
                singleNoteToggler={this.singleNoteToggler}
                handleContent={this.handleContent}
                handleTitle={this.handleTitle} />
        })
        const NewScratch = { title, date, content }

        console.log('scratchpad', this.props.scratchPad)
        let scratchPad = this.props.scratchPad.map(scratch => {
            return <ScratchPad key={scratch.id}
                scratch={scratch}
                updatedScratchPad={this.updatedScratchPad} />
        })



        let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let dayNumber = this.state.date.getDay();
        let day = daysOfTheWeek[dayNumber];

        let monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let monthNumber = this.state.date.getMonth();
        let month = monthsOfTheYear[monthNumber];
        return (
            <div className="content-container" id="content-outer">
                <div className="notes-container">
                    <h1 className="maintitles">Note Pad</h1>
                    <div className="notepadtitlearea">
                        <h2 className="note-buttons" onClick={this.scratchPadToggler}>Scratch Pad</h2>
                        <h2 className="note-buttons" onClick={this.addNoteToggler}>Create A New Note</h2>
                    </div>
                    <h2 className="maintitles">Your Saved Notes</h2>
                    {notePad}
                </div>
                <div className="scratchpad">
                    {this.state.isSingleNoteVisible &&
                        <div>
                            <header className="notestitlearea">
                                <div>{this.state.RenderedNote.date}</div>
                                <input className="notepadtitles" value={this.state.RenderedNote.title} onChange={this.handleTitle} />
                            </header>
                            <textarea className="notestextarea" value={this.state.RenderedNote.content} onChange={this.handleContent} />
                            {/* <button className= "note-buttons" onClick={()=> this.saveUpdatedNote(this.state.RenderedNote.id)}>Save</button> */}
                            <div className="garbagecandiv">
                                <h5 className="notesRemove" onClick={() => this.deleteModalToggler()}></h5>
                                {this.state.isDelelteModalopen &&
                                    <div className="deleteModal">
                                        <h5 className="note-buttons-delete-modal">Are you sure you want to delete {this.state.RenderedNote.title}?</h5>
                                        <h4 className="note-buttons-delete" onClick={() => { { this.props.deleteNotes(this.state.RenderedNote.id); this.deleteModalToggler(); this.addNoteToggler() } }}>Delete</h4>
                                        <h4 className="note-buttons-cancel" onClick={() => this.deleteModalToggler()}>Cancel</h4>
                                    </div>}
                            </div>
                        </div>}
                    {this.state.isScratchPadVisible &&
                        <div>
                            {/* <h5> 
                            <span>{day}, </span>
                            <span>{month} </span>
                            <span>{this.state.date.getDate()} </span>
                            <span>{this.state.date.getFullYear()}</span>
                        </h5>
                        {/* <input className="notepadtitles" placeholder='title' value={this.state.title} onChange={this.handleNewTitle}></input> */}
                            {/* <textarea className="addscratchpadcontent" placeholder='text' value={this.state.content} onChange={this.handleNewContent}/>
                        <h4 className="note-buttons" onClick={() => this.props.addScratchPad(NewScratch)}>Save to Scratch Pad</h4> */}
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
                            <input className="notepadtitles" placeholder='title' value={this.state.title} onChange={this.handleNewTitle}></input>
                            {/* <textarea wrap="on"  className="addnotestextarea" name="text" placeholder='content' value={this.state.content} onChange={this.handleNewContent}/> */}
                            <TextField
                                id="filled-textarea"
                                name="text"
                                placeholder="content"
                                value={this.state.content}
                                onChange={this.handleNewContent}
                                multiline
                                className="addnotestextarea"
                                margin="normal"
                                variant="filled"
                            />
                            <h4 className="note-buttons" onClick={() => { this.props.addNotes(newNote); this.eraseText(content, title) }}>Save</h4>
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

export default connect(mapStateToProps, { getNotes, addNotes, addScratchPad, getScratchPad, editNotes, deleteNotes })(NotePad)

{/* <h3 className="add-event-submit" onClick={()=>this.eventUpdaterSubmit(event.event_id)}>Update Event</h3> */ }

// cron.schedule('1 0 0 * * *', () => { // runs at 00:01 EST every day
//  //cron.schedule('*/10 * * * * *', (req) => {
//  habitsController.updateHabitEvents(app);
//  habitsController.deleteTodaysHabits(app);
//  notesController.addScratchPad(app);
// }, {
//   scheduled: true,
//   timezone: "America/New_York" // set to users timezone if poss
// })

// cron.schedule('* * * * * sun', () => {
// // cron.schedule('*/10 * * * * *', (req) => {
//   notesController.deleteScratchPad(app);
// }, {
//   schedule: true,
//   timezone: "America/New_York"
// })
