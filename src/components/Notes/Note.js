import React,{Component} from 'react'
import './Notes.css';
import {connect} from 'react-redux'
import {deleteNotes} from '../../redux/reducers/notepad'



class Note extends Component{
    constructor(props){
        super(props)
        this.state = {
           title: props.note.title,
           content: props.note.content,
            edit: true
        }
        }
       

    render(){
        let {note} = this.props
        // console.log('note', note)
        return(
         <div className="textContainer-pup">  
                
             <div key={note.id}> 
                 <h5 className="note-buttons" onClick={()=>this.props.singleNoteToggler(note)}>{note.title}</h5>
                 <h6>{note.date}</h6>
                 <button className="notesRemove" onClick={() => this.props.deleteNotes(note.id)}></button>   
     
             </div>
         </div> 
        ) 
    }
}




export default connect(null, {deleteNotes})(Note)