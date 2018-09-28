import React,{Component} from 'react'
import './Notes.css';

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
                 <h3 className="note-buttons" onClick={()=>this.props.singleNoteToggler(note)}>{note.title}</h3>
                 {/* <h6>{note.date}</h6>      */}
             </div>
         </div> 
        ) 
    }
}




export default Note