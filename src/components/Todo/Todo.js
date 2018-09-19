import React, { Component } from 'react';
import './todo.css'
import{ connect } from 'react-redux'
import{getTodos,deleteTodos,editTodos,createTodos} from '../../redux/reducers/todo'
import{getCurrentUser} from '../../redux/reducers/user'

class Todo extends Component{

    componentDidMount = () => {
        this.props.getTodos()
        this.props.getCurrentUser()
    }

    handleInputChange = (e) => {
        this.setState({input: e.target.value})
    }

    handleSubmit = () => {
        this.props.createTodos(this.props.user.data.id, this.state.input)
    }

    
    render(){
        console.log(this.props);
        return(
            <div className="content-container">
                <input className='todoInput' placeholder='Wat do ????' onChange={this.handleInputChange}/>
                <button className='addTodoButton' onClick={this.handleSubmit}>+</button>
                {this.props.todos.map(todo => {
                    if(todo.userId === this.props.user.data.id){
                        return(
                            <div>
                                <p>{todo.content}</p>
                            </div>
                        )
                    } else { null }
                })}
            </div>
        )
    }
}

let mapStateToProps = state => {
    return{
        todos : state.todos,
        input : state.input,
        user : state.user
    }
}

export default connect(mapStateToProps, {
    getTodos,
    deleteTodos,
    editTodos,
    createTodos,
    getCurrentUser
})(Todo)