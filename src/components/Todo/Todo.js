import React, { Component } from 'react';
import './todo.css'
import{ connect } from 'react-redux'
import{getTodos,deleteTodos,editTodos,createTodos} from '../../redux/reducers/todo'

class Todo extends Component{


    handleInputChange(e){
        this.setState({value: e.target.value})
    }

    componentDidMount(){
        this.props.getTodos()
    }
    render(){
        console.log(this.props.input);
        return(
            <div className="content-container">
                <input className='todoInput' placeholder='What on your agenda?' onChange={this.handleInputChange}/>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return{
        todos : state.todos,
        input : state.input
    }
}

export default connect(mapStateToProps, {
    getTodos,
    deleteTodos,
    editTodos,
    createTodos
})(Todo)