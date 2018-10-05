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
            content: props.scratch.content
        }
    }
    
    componentDidMount() {
        document.addEventListener('click', this.removeListenerSP)
    }

    componentWillUnmount(){
        // this.unmoutcallbackmethod()
        setTimeout(() => {
    document.removeEventListener('click', this.removeListenerSP)
        }, 250)
    }

    removeListenerSP =  (e) => {
        if(!document.getElementById('content-outer-scratchpad')) {
            this.saveUpdatedScrachPad()
        } else {
            console.log('scratch should not save')
        }
    }
    
    saveUpdatedScrachPad = () => {
        console.log('scratch should save7373646447')
        let obj = {
            date: '',
            title: this.state.title,
            content: this.state.content,
        }
        axios.put(`/api/scratchpad/${this.props.scratch.id}`, obj).then(results=> {
            this.props.editScratchPad(results.data)
        })
    }
    
        handleContent = (e) => {
            this.setState({
                content: e.target.value
            })
        }
        
        
        render(){
            let {scratch} = this.props 
        let daterrr = new Date (scratch.date);
        let dayNumber = daterrr.getDay()
        let daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let monthsOfTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        let monthNumber = daterrr.getMonth()
        let day = daysOfTheWeek[dayNumber];
        let month = monthsOfTheYear[monthNumber];
        let date = daterrr.getDate()
        let formattedDate = `${day}, ${month} ${date}`
        console.log('so i know what is', this.props)
        return(
        //  <div id="">  
                
             <div key={scratch.id} id="content-outer-scratchpad"> 
                 <h5>{formattedDate}</h5>
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
                 {/* <h4 className= "note-buttons" onClick={()=> this.saveUpdatedScrachPad(scratch.id)}>Save</h4> */}
                 {/* <h4 className="note-buttons-delete" onClick={() => this.props.deleteScratchPad(scratch.id)}>Delete</h4>    */}
     
             </div>
        //  </div> 
            ) 
        }
    }


let mapStateToProps = state => {
    return{
        scratchPad: state.notepad.scratchPad
    }
}

export default connect(mapStateToProps, {deleteScratchPad, editScratchPad})(ScratchPad)