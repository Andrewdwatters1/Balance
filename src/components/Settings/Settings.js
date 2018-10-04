import React,{Component} from 'react'
import backgroundOptions from './Backgrounds.js'
import './Settings.css'
import axios from 'axios';

//Images

const left = require('../../assets/left-arrow.png')
const right = require('../../assets/right-arrow.png')
const check = require('../../assets/tick.png')

class Settings extends Component{
    constructor(props){
        super(props);
        this.state={
            displayedBackground: 0
        }
    }

    arrowRight = () => {
        if(this.state.displayedBackground < 10)
        this.setState({
            displayedBackground: this.state.displayedBackground + 1
        })
    }

    arrowLeft = () => {
        if(this.state.displayedBackground > 0){
        this.setState({
            displayedBackground: this.state.displayedBackground - 1
        })
    }}

    updatePreferredBackground = () => {
        let obj = {background_id : this.state.displayedBackground};
        axios.put(`/api/backgrounds`, obj).then(res =>{
            document.body.style.background = `linear-gradient(\n        rgba(0,0,0,0.516),\n        rgba(0,0,0,0.516)\n    ),\n    url(${backgroundOptions[this.state.displayedBackground]}) no-repeat center center fixed`
            document.body.style.backgroundSize = 'cover'
            this.props.homeClick()
        })
    }
    

    render(){

        let backgroundDisplay = backgroundOptions[this.state.displayedBackground];

        return(
         <div className="content-container">  
            <div>
                <h1 className="background-title">Choose a Background</h1>
                <img className="left-arrow" alt="left" src={left} onClick={this.arrowLeft}/>
                <img className="background-thumbnail" src={backgroundDisplay} />
                <img className="checkmark" src={check} alt="select this background" onClick={this.updatePreferredBackground}/>
                <img className="right-arrow" alt="right"src ={right} onClick={this.arrowRight}/>
            </div>
         </div> 
        ) 
    }
}

export default Settings