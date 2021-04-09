import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
const { default: AuthenticationService } = require("./AuthenticationService");

class AuthenticatedRoute extends Component{
    render(){
        if(AuthenticationService.isUserLoggedIn()){
            return <Route {...this.props}></Route>
        }
        else{
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute;