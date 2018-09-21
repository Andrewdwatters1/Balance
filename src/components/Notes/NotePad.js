import React, { Component } from 'react';
import Note from './Note';
import {connect} from 'react-redux';
import {getNotes, addNotes, addScratchPad, getScratchPad} from '../../redux/reducers/notepad';
import './Notes.css';
import ScratchPad from './ScratchPad';

class NotePad extends Component{
    constructor(props){
        super(props);
        var time = this.getTimeString();
        this.state={
            name: '',
            date:'',
            content:'',
            RenderedNote: [],

            isSingleNoteVisible: false,
            isScratchPadVisible: true,
            isAddNoteVisible: false,

            date: new Date(),
            time: time,
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
    singleNoteToggler = () => {
        this.setState({
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
        this.setState({title: e.target.value})
    }
      
    handleContent = (e) => {
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

    render(){
        const  {title, date, content} = this.state
        const newNote = { title, date, content } 
            console.log(this.props)    
        let notePad = this.props.notePad.map(notes => {
            return <Note key={notes.id}
                    note={notes}
                    updatedNotes={this.updatedNotes}
                    singleNoteToggler={this.singleNoteToggler}/>
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
                    <ul>
                        <li> <button className="note-buttons" onClick={this.scratchPadToggler}>Scratch Pad</button></li>
                        <li><button className="note-buttons" onClick={this.addNoteToggler}>Add A New Note(note pad)</button></li>
                        <li><button className="note-buttons" onClick={this.singleNoteToggler}>(note pad)</button></li>
                    </ul>
                    {notePad}    
                </div>
                <div className="scratchpad">
                    {this.state.isSingleNoteVisible && notePad}
                    {this.state.isScratchPadVisible && 
                    <div>
                        <h5> 
                            <span>{day}, </span>
                            <span>{month} </span>
                            <span>{this.state.date.getDate()} </span>
                            <span>{this.state.date.getFullYear()}</span>
                        </h5>
                        <input placeholder='title' value={this.state.title} onChange={this.handleTitle}></input>
                        <textarea placeholder='content' value={this.state.content} onChange={this.handleContent}/>
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
                        <input placeholder='title' value={this.state.title} onChange={this.handleTitle}></input>
                        <textarea placeholder='content' value={this.state.content} onChange={this.handleContent}/>
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
  
export default connect(mapStateToProps,{getNotes, addNotes, addScratchPad, getScratchPad})(NotePad)