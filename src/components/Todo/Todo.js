import React, { Component } from 'react';
import './todo.css'
import{ connect } from 'react-redux'
import{getTodos,deleteTodos,editTodos,createTodos} from '../../redux/reducers/todo'
import{getCurrentUser} from '../../redux/reducers/user'

class Todo extends Component{

    componentDidMount(){
        this.props.getCurrentUser()
        this.props.getTodos(this.props.user.id)
    }

    handleInputChange = (e) => {
        this.setState({input: e.target.value})
    }

    handleSubmit = () => {
        this.props.createTodos(this.props.user.id, this.state.input)
        this.props.getTodos(this.props.user.id)
    }

    deleteTodo = (id) => {
        this.props.deleteTodos(id, this.props.user.id)
    }

    render(){
        return(
            <div className="todo-container">
            <div className='todoInputAndButton'>
                <input className='todoInput' placeholder='What do you need to do today?' onChange={this.handleInputChange}/>
                <button className='addTodoButton' onClick={this.handleSubmit}>+</button>
            </div>
                <div className='baseTodoWrapper'>
                {this.props.todos.map(todo => {
                    return(
                       <div className='todoIndivContainer' key={todo.id}>
                        <div className='todoContainerInfo'>
                           <button className='todoControlDone'><img /></button>
                           <p>{todo.content}</p>
                           <button className='todoControlEdit'></button>
                           <button className='todoControlRemove' onClick={() => this.deleteTodo(todo.id)}></button>
                        </div>
                       </div> 
                    )
                })}
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return{
        todos : state.todo.todos,
        input : state.todo.input,
        user : state.user.data
    }
}

export default connect(mapStateToProps, {
    getTodos,
    deleteTodos,
    editTodos,
    createTodos,
    getCurrentUser
})(Todo)