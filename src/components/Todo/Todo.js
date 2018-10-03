import React, { Component } from 'react';
import './todo.css'
import{ connect } from 'react-redux'
import{getTodos,deleteTodos,editTodos,createTodos, markComplete, markIncomplete, toggleEdit, getNested, createNested, deleteNested, editNested, completeNested, incompleteNested, nestedToggleEdit} from '../../redux/reducers/todo'
import{getCurrentUser} from '../../redux/reducers/user'

class Todo extends Component{

    constructor(){
        super()
        this.state={
            nested : [],
            parentId : null

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

        this.setState({
            input:''
        })
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

    deleteNested = (id) => {
        this.props.deleteNested(id, this.props.user.id)
    }


//NESTED BELOW




    getNested = (id) => {
        this.setState({
            parentId : id
        })
        this.props.getNested(id)
    }

    handleNestedInput = (e) => {
        this.setState({
            nestedInput : e.target.value
        })
    }

    handleNestedSubmit = (id) => {
        id = this.state.parentId
        if(this.state.parentId){
            this.props.createNested(id, this.props.user.id, this.state.nestedInput)
        }

        this.setState({
            nestedInput:''
        })
    }

    deleteNested = (id) => {
        console.log(id)
        this.props.deleteNested(id, this.state.parentId)
    }


    handleNestedEditInput = (e) => {
        this.setState({
            nestedEdit : e.target.value
        })
    }


    editNested = (id) => {
        this.props.editNested(this.state.nestedEdit, id , this.state.parentId)
        this.props.nestedToggleEdit(!this.props.nestedFlag)
    }

    nestedToggleEdit = () => {
        this.props.nestedToggleEdit(!this.props.nestedFlag)
    }

    completeNested = (id) => {
        this.props.completeNested(id, this.props.user.id)
    }

    incompleteNested = (id) => {
        this.props.incompleteNested(id, this.props.user.id)
    }

    handleNestedCompletion = (nest) => {
        console.log(nest.completed)
        if(nest.completed === true){
            this.props.incompleteNested(nest.id, this.state.parentId)
        } else if (nest.completed === false){
            this.props.completeNested(nest.id, this.state.parentId)
        }
}




    render(){

        let todos = [...this.props.todos]
        let nested = [...this.props.nested]
        return(
            <div className="todo-container">
            <div className='todoInputAndButton'>
                <input className='todoInput' placeholder='What do you need to do today?' value={this.state.input} onChange={this.handleInputChange}/>
                <button className='fas fa-plus' onClick={this.handleSubmit}></button>
                <button id='edit' className='fas fa-pen-nib' onClick={this.handleEdit}></button>
            </div>
                <div className='baseTodoWrapper'>
                {todos.map(todo => {
                    let finishedStyle = {}
                    let noDisp = {}
                    let check = {}
                    if(todo.completed === true) {
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
                            <input placeholder={todo.content} onChange={this.handleEditInput}  className='editTodoInput'/>
                            <button onClick={() => this.handleEditSubmit(todo.id)} className='fas fa-check'></button>
                        </div>    
                        :
                        <p id ='content' className='todoContent' style={finishedStyle}>{todo.content}</p>}
                            {/*  TERNARY HERE please be careful he's very fragile*/}

                           <button id ='trash' className='fas fa-cut' onClick={() => this.deleteTodo(todo.id)}></button>
                           <button className='fas fa-angle-right' onClick={() => this.getNested(todo.id)}></button>
                        </div>
                       </div> 
                    )
                })}
                </div>
                <div className='nested'>
                <div className='nestedButtons'>
                    <input className='nestedInput' placeholder='Add more to your todo here!' value={this.state.nestedInput} onChange={this.handleNestedInput}/>
                    <button className='fas fa-plus' onClick={() => this.handleNestedSubmit(this.state.parentId)}></button>
                    <button id='edit' className='fas fa-pen-nib' onClick={this.nestedToggleEdit}></button>
                </div>
                <div className='nestedContent'>
                    {nested.map(nest => {
                        let check = {}
                        let finished = {}
                        if(nest.completed === true){
                            check = {
                                color: 'green'
                            }
                            finished = {
                                color: 'gray',
                                textDecoration: 'line-through'
                            }
                        } else if (nest.completed === false) {
                            check = {},
                            finished = {}
                        }
                        return(
                        <div key={nest.id}>
                        {this.props.nestedFlag ?
                         <div>
                             <input className ='editTodoInput' placeholder={nest.content}onChange={this.handleNestedEditInput}/>
                             <button className='fas fa-check' onClick={() => this.editNested(nest.id)}></button>
                             <button className='fas fa-cut' onClick={() => this.deleteNested(nest.id)}></button>
                         </div>   
                         :
                         <div className='nestedInfo'>
                            <button className='far fa-circle' onClick={() => this.handleNestedCompletion(nest)} style={check}></button>
                            <p style={finished}>{nest.content}</p>
                            <button className='fas fa-cut' onClick={() => this.deleteNested(nest.id)}></button>
                         </div>
                     }
                     </div>)
                    })}
                </div>
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