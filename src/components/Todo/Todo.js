import React, { Component } from 'react';
import './todo.css'
import{ connect } from 'react-redux'
import{getTodos,deleteTodos,editTodos,createTodos} from '../../redux/reducers/todo'

class Todo extends Component{

    componentDidMount = () => {
        this.props.getTodos()
    }

    handleInputChange = (e) => {
        this.setState({input: e.target.value})
    }

    handleSubmit = () => {
        this.setState({input: ''})
        this.props.createTodos(this.state.input)
    }

    
    render(){
        console.log(this.props.todos);
        return(
            <div className="content-container">
                <input className='todoInput' placeholder='Wat do ????' onChange={this.handleInputChange}/>
                <button className='addTodoButton' onClick={this.handleSubmit}>+</button>
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