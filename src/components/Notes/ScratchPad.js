import React,{Component} from 'react'
import {connect} from 'react-redux'
import {deleteScratchPad} from '../../redux/reducers/notepad'
import './Notes.css'



class ScratchPad extends Component{


    render(){
        let {scratch} = this.props
        // console.log('scratch', scratch)
        return(
         <div>  
                
             <div key={scratch.id}> 
                 <h5>{scratch.date}</h5>
                 <h3>{scratch.title}</h3>
                 <h4>{scratch.content}</h4>
                 {/* <button className= "buttons" onClick={ this.toggleEdit}>Edit Note</button> */}
                 <button onClick={() => this.props.deleteScratchPad(scratch.id)}>Delete</button>   
     
             </div>
         </div> 
        ) 
    }
}

export default connect(null, {deleteScratchPad})(ScratchPad)