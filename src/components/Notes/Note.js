import React,{Component} from 'react'
import {connect} from 'react-redux'
import {deleteNotes} from '../../redux/reducers/notepad'



class Note extends Component{


    render(){
        let {note} = this.props
        return(
         <div className="textContainer-pup">  
               
            <div key={note.id}> 
                <h2>{note.title}</h2>
                <h3>{note.date}</h3>
                {/* <button className= "buttons" onClick={ this.toggleEdit}>Edit Puppy</button> */}
                <button onClick={() => this.props.deleteNotes(note.id)}>Delete Note</button>        
            </div>
         </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}


export default connect(mapStateToProps, {deleteNotes})(Note)