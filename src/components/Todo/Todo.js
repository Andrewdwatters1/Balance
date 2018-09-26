import React, { Component } from 'react';
import './todo.css'
import{ connect } from 'react-redux'
import{getTodos,deleteTodos,editTodos,createTodos, markComplete, markIncomplete, toggleEdit} from '../../redux/reducers/todo'
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

    markComplete = (id) => {
        this.props.markComplete(id, this.props.user.id)
        this.props.markIncomplete(id, this.props.user.id)

    }

    handleCompletion = (todo) => {
            if(todo.completed === true){
                this.props.markIncomplete(todo.id, this.props.user.id)
            } else if (todo.completed === false){
                this.props.markComplete(todo.id, this.props.user.id)
            }
    }

    handleEditInput = (e) => {
        this.setState({editInput : e.target.value})
    }

    handleEdit = () => {
        this.props.toggleEdit(!this.props.editFlag)
    }

    handleEditSubmit = (todo) => {
        this.props.editTodos(this.props.user.id, todo.id, this.props.editInput)
    }

    render(){
        console.log(this.props.editInput);
        let todos = [...this.props.todos]
        return(
            <div className="todo-container">
            <div className='todoInputAndButton'>
                <input className='todoInput' placeholder='What do you need to do today?' onChange={this.handleInputChange}/>
                <button className='addTodoButton' onClick={this.handleSubmit}>+</button>
            </div>
                <div className='baseTodoWrapper'>
                {todos.map(todo => {
                    let finishedStyle = {}
                    let noDisp = {}
                    let check = {}
                    if(todo.completed) {
                        finishedStyle = {
                            color: 'gray',
                            textDecoration: 'line-through'
                        }
                        noDisp = {
                            display: 'none',
                        }
                        check = {
                            background: `url(${require('../../assets/checkMark.png')}) no-repeat`
                        }
                    }
                    console.log(todo)
                    return(
                       <div className='todoIndivContainer' key={todo.id}>
                        <div className='todoContainerInfo'>
                           <button className='todoControlDone' onClick={() => this.handleCompletion(todo)} style={check}></button>

                           {/*  TERNARY HERE please be careful he's very fragile*/}
                           {this.props.editFlag ?  
                        <div>
                            <input placeholder={todo.content} onChange={() => this.handleEditInput} className='editTodoInput'/>
                            <button onClick={() => this.handleEditSubmit(todo)}>E</button>
                        </div>    
                        :
                        <p id ='content' className='todoContent' style={finishedStyle}>{todo.content}</p>}
                            {/*  TERNARY HERE please be careful he's very fragile*/}

                           <button id='edit' className='todoControlEdit' style={noDisp} onClick={this.handleEdit}></button>
                           <button id ='trash' className='todoControlRemove' onClick={() => this.deleteTodo(todo.id)}></button>
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
        user : state.user.data,
        editFlag : state.todo.editFlag,
        editInput: state.todo.editInput
    }
}

export default connect(mapStateToProps, {
    getTodos,
    deleteTodos,
    editTodos,
    createTodos,
    getCurrentUser,
    markComplete,
    markIncomplete,
    toggleEdit
})(Todo)