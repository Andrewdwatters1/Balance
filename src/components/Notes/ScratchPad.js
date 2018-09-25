import React,{Component} from 'react'
import {connect} from 'react-redux'
import {deleteScratchPad} from '../../redux/reducers/notepad'
import axios from 'axios'
import './Notes.css'



class ScratchPad extends Component{
    constructor(props){
        super(props);
        
        this.state =
        {
            edit: true,
            title: props.scratch.title,
            content: props.scratch.content
        }
    }

        saveUpdate = (id) => {
            let {title, date, content} = this.state
            let scratchPad = {title, date, content}
            axios.put('/api/scratchpad/${id}', scratchPad).then(results=> {
                this.props.exitScratchPad(results.data)
            })
        }
        handleTitle = (e) => {
            this.setState({
                title: e.target.value
            })
        }

        handleContent = (e) => {
            this.setState({
                content: e.target.value
            })
        }

    render(){
        let {scratch} = this.props 
        let {title} = this.state 
        // let {content} = this.state       // console.log('scratch', scratch)
        return(
         <div>  
                
             <div key={scratch.id}> 
                 <h5>{scratch.date}</h5>
                 <input className="note-buttons"value={title} onChange={this.handleTitle}/>
                 <textarea className= "note-buttons"value={this.state.content} onChange={this.handleContent}/>
                 <button className= "note-buttons" onClick={()=> this.sendUpdate(scratch.id)}>Save</button>
                 <button className="note-buttons" onClick={ this.toggleEdit}>Edit</button>
                 <button className="note-buttons" onClick={() => this.props.deleteScratchPad(scratch.id)}>Delete</button>   
     
             </div>
         </div> 
            ) 
        }
    }


let mapStateToProps = state => {
    return{
        scratchPad: state.notepad.scratchPad
    }
}

export default connect(mapStateToProps, {deleteScratchPad})(ScratchPad)