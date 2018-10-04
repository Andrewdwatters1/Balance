import React,{Component} from 'react'
import {connect} from 'react-redux'
import {deleteScratchPad, editScratchPad} from '../../redux/reducers/notepad'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
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

    saveUpdatedScrachPad = (id) => {
        let obj = {
            date: '',
            title: this.state.title,
            content: this.state.content,
        }
            axios.put(`/api/scratchpad/${id}`, obj).then(results=> {
                // console.log('results', results.data)
                this.props.editScratchPad(results.data)
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
                 {/* <input className="notepadtitles" value={title} onChange={this.handleTitle}/> */}
                 <TextField
                            id="filled-textarea"
                            name="text"
                            placeholder="content"
                            value={this.state.content}
                            onChange={this.handleContent}
                            multiline
                            className="addscratchpadcontent"
                            margin="normal"
                            variant="filled"
                        />
                 {/* <textarea className="addscratchpadcontent" value={this.state.content} onChange={this.handleContent}/> */}
                 <h4 className= "note-buttons" onClick={()=> this.saveUpdatedScrachPad(scratch.id)}>Save</h4>
                 <h4 className="note-buttons-delete" onClick={() => this.props.deleteScratchPad(scratch.id)}>Delete</h4>   
     
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

export default connect(mapStateToProps, {deleteScratchPad, editScratchPad})(ScratchPad)