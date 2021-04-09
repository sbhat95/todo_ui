import React, { Component } from "react";
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from './LoginComponent'
import HeaderComponent from './HeaderComponent'
import ListToDosComponent from './ListToDosComponent'
import WelcomeComponent from './WelcomeComponent'
import FooterComponent from './FooterComponent'
import ErrorComponent from './ErrorComponent'
import LogOutComponent from './LogOutComponent'
import ToDoComponent from './ToDoComponent'
class ToDoApp extends Component{
    render (){
        return(
            
           <Router>
              
               <>
               <HeaderComponent/>
               <Switch>
               <Route path="/" exact component={LoginComponent}/>
               <Route path="/login" component={LoginComponent}/>
               <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
               <AuthenticatedRoute path="/todo/:id" component={ToDoComponent}/>
               <AuthenticatedRoute path="/todos" component={ListToDosComponent}/>
               <AuthenticatedRoute path = "/logout" component={LogOutComponent}/>
               <Route path="" component={ErrorComponent}/>
               </Switch>
               <FooterComponent/>
               </>
             
           </Router>
            
        );
    }
}
export default ToDoApp