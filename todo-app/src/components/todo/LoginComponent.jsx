import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import ShowFailure from './ShowFailure'
class LoginComponent extends Component{

    constructor(props){
        super(props)
        this.state={
        username: 'user',
        password: '',
        hasLoginFailed: false,
        showSuccessMessage: false
        }

        this.handleChangeEvent=this.handleChangeEvent.bind(this)
        this.loginClicked=this.loginClicked.bind(this)
        //this.handlePWDChange=this.handlePWDChange.bind(this)
        
    }

    handleChangeEvent(event){
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value})
        
    }

    loginClicked(){
        // if(this.state.username==='in28minutes'&& this.state.password==='dummy'){
        //     console.log('Successful')
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     // this.setState({ hasLoginFailed:false})
        //     // this.setState({showSuccessMessage:true})
        //     this.props.history.push(`/welcome/${this.state.username}`)
            
        // }
        // else{
        //     console.log('Failed')
        //     this.setState({hasLoginFailed:true})
        //     this.setState( {showSuccessMessage:false})
        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username,this.state.password)
        // .then(
        //     ()=>{AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        // this.props.history.push(`/welcome/${this.state.username}`)}
        // ) 
        // .catch(
        //     ()=>{
        //     this.setState({hasLoginFailed:true})
        //     this.setState( {showSuccessMessage:false})
        //     }
        // )

        AuthenticationService.executeJwtAuthenticationService(this.state.username,this.state.password)
        .then(
            (response)=>{AuthenticationService.registerSuccessfulJwtLogin(this.state.username, response.data.token )
        this.props.history.push(`/welcome/${this.state.username}`)}
        ) 
        .catch(
            ()=>{
            this.setState({hasLoginFailed:true})
            this.setState( {showSuccessMessage:false})
            }
        )
    }
    render(){
        return(
           
            <div>
                 <h1>Login</h1>
                 <div className="container">
                <ShowFailure hasLoginFailed={this.state.hasLoginFailed}></ShowFailure>
               
            UserName:<input type="text" name="username" value={this.state.username} onChange={this.handleChangeEvent}/>
            Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChangeEvent}/>
            <button className="btn btn=success"onClick={this.loginClicked}>Login</button>
            </div>
            </div>
        )
    }
}

export default LoginComponent