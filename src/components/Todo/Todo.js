import React, { Component } from 'react';
import './todo.css'
import{ connect } from 'react-redux'
import{getTodos,deleteTodos,editTodos,createTodos, markComplete, markIncomplete, toggleEdit, getNested, createNested, deleteNested, editNested, completeNested, incompleteNested, nestedToggleEdit} from '../../redux/reducers/todo'
import{getCurrentUser} from '../../redux/reducers/user'

class Todo extends Component{

    constructor(){
        super()
        this.state={
            nested : []

            //Nesting:
            //Get nested on click of wrapping div
            //Functionality is (mostly) the same as far as buttons(adding, editing, etc.) are concerned.
        }
    }

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

    handleEditSubmit = (id) => {
        this.props.editTodos(
            this.state.editInput,
            id,
            this.props.user.id
        )
        this.props.toggleEdit(!this.props.editFlag)
    }


//NESTED BELOW



    getNested = (id) => {
        console.log('hihihihi');
        
        this.props.getNested(id)
    }

    handleNestedInput = (e) => {
        this.setState({
            nestedInput : e.target.value
        })
    }

    render(){
        let todos = [...this.props.todos]
        return(
            <div className="todo-container">
            <div className='todoInputAndButton'>
                <input className='todoInput' placeholder='What do you need to do today?' onChange={this.handleInputChange}/>
                <button className='fas fa-plus' onClick={this.handleSubmit}></button>
                <button id='edit' className='fas fa-pen-nib' onClick={this.handleEdit}></button>
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
                            color: 'green',
                        }
                    }
                    return(
                       <div className='todoIndivContainer' key={todo.id} >
                        <div className='todoContainerInfo'>
                           <button className='far fa-circle' onClick={() => this.handleCompletion(todo)} style={check}></button>

                           {/*  TERNARY HERE please be careful he's very fragile*/}
                           {this.props.editFlag ?  
                        <div>
                            <input placeholder={todo.content} onChange={this.handleEditInput} className='editTodoInput'/>
                            <button onClick={() => this.handleEditSubmit(todo)} className='fas fa-check'></button>
                        </div>    
                        :
                        <p id ='content' className='todoContent' style={finishedStyle}>{todo.content}</p>}
                            {/*  TERNARY HERE please be careful he's very fragile*/}

                           <button id ='trash' className='fas fa-cut' onClick={() => this.deleteTodo(todo.id)}></button>
                           <button className='fas fa-angle-right' onClick={this.getNested(todo.id)}></button>
                        </div>
                       </div> 
                    )
                })}
                </div>
                <div>
                    <button></button>
                    {this.props.nested.map(nest => {
                        <div>
                        {this.props.nestedFlag ?
                         <div>
                             <input onChange={this.handleNestedInput}/>
                             <button></button>
                         </div>   
                         :
                         <p>{nest.content}</p>
                     }
                     </div>
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
        editInput: state.todo.editInput,

        //Nested

        nested: state.todo.nested,
        nestedInput: state.todo.nestedInput,
        nestedFlag: state.todo.nestedFlag,
        nestedEdit: state.todo.nestedInput
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
    toggleEdit,
    getNested,
    createNested,
    deleteNested,
    editNested,
    completeNested,
    incompleteNested,
    nestedToggleEdit
})(Todo)