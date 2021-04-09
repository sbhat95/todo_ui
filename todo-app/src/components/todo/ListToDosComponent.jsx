import React, { Component } from "react";
import ToDoDataService from '../../api/todo/ToDoDataService';
import AuthenticationService from "./AuthenticationService";
import moment from 'moment'

class ListToDosComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            todos: [],
            message:null
        }

        this.addTodo=this.addTodo.bind(this)
        this.updateTodo=this.updateTodo.bind(this)
        this.deleteTodo=this.deleteTodo.bind(this)
        this.refreshComponent=this.refreshComponent.bind(this)
    }
    render(){
        return(
            <div>
                <h1>List ToDos</h1>
                <div className="container">
                {this.state.message&&<div className="alert alert-success">{this.state.message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                           
                            <td>Description</td>
                            <td>Is Done</td>
                            <td>Target Date</td>
                            <td>Update </td>
                            <td>Delete </td>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.todos.map(todo =>
                                <tr key={todo.id}>
                               
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                <td><button className="btn btn-success" onClick={()=>this.updateTodo(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=>this.deleteTodo(todo.id)}>Delete</button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                </div>
                <div>
                    <button className='btn btn-success' onClick={this.addTodo}>Add</button>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.refreshComponent();
        
    }

    addTodo(id){
        this.props.history.push(`todo/-1`)
    }

    updateTodo(id){
        this.props.history.push(`todo/${id}`)
    }

    deleteTodo(id){
        let user = AuthenticationService.getLoggedInUser();
        ToDoDataService.deleteATodo(user, id)
        .then(this.setState({message: `The Todo ${id} has been deleted`}))
        this.refreshComponent();
    }

    refreshComponent(){
        let user = AuthenticationService.getLoggedInUser();
        ToDoDataService.retrieveAllToDos(user)
        .then(response=>{
           this.setState({todos:response.data})
           console.log(response)
        }
        )
    }
}
export default ListToDosComponent