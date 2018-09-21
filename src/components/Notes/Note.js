import React,{Component} from 'react'
import {connect} from 'react-redux'
import {deleteNotes} from '../../redux/reducers/notepad'



class Note extends Component{
    constructor(props){
        super(props)
        }


    render(){
        let {note} = this.props
        // console.log('note', note)
        return(
         <div className="textContainer-pup">  
                
             <div key={note.id}> 
                 <button className="note-buttons" onClick={this.singleNoteToggler}>{note.title}</button>
                 <h3>{note.date}</h3>
                 <button className= "note-buttons" onClick={ this.toggleEdit}>Edit Note</button>
                 <button className="note-buttons" onClick={() => this.props.deleteNotes(note.id)}>Delete Note</button>   
     
             </div>
         </div> 
        ) 
    }
}




export default connect(null, {deleteNotes})(Note)