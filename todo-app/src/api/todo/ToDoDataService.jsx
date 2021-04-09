import axios from "axios";
import { API_URL, JPA_API_URL } from '../../Constants'
class ToDoDataService{

    retrieveAllToDos(name){
        return axios.get(`${JPA_API_URL}/user/${name}/todos`)
    }

    deleteATodo(name, id){
        return axios.delete(`${JPA_API_URL}/user/${name}/todos/${id}`)
    }

    fetchAToDo(name, id){
        return axios.get(`${JPA_API_URL}/user/${name}/todos/${id}`)
    }


    updateATodo(name, id, todo){
        return axios.put(`${JPA_API_URL}/user/${name}/todos/${id}`, todo)
    }

    addATodo(name, todo){
        return axios.post(`${JPA_API_URL}/user/${name}/todos`, todo)
    }
}

export default new ToDoDataService();