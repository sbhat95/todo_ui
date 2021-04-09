import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.jsx'
class WelcomeComponent extends Component{

    constructor(props){
        super(props);
        this.retrieveWelcomeMessage=this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessResponse=this.handleSuccessResponse.bind(this)
        this.retrieveWelcomeBean=this.retrieveWelcomeBean.bind(this)
        this.retrievePathVar = this.retrievePathVar.bind(this)
        this.handleErrorResponse=this.handleErrorResponse.bind(this)
        this.state ={
            welcomeMessage :'',
            welcomeBean:''
        }
    }
    render(){
        return(
            <>
            <h1>Welcome</h1>
            <div className="container">Welcome {this.props.match.params.n} 
            You can add your ToDos <Link to="/todos">-Here-</Link></div>

            <div className="container">
            Custom Welcome Message
            <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Message</button>
            </div>

            <div className="container">
            Hello World Bean
            <button onClick={this.retrieveWelcomeBean} className="btn btn-success">Get Bean</button>
            </div>

            <div className="container">
            Hello World Path Variable
            <button onClick={this.retrievePathVar} className="btn btn-success">Get Name</button>
            </div>

            <div className='container'>
                {this.state.welcomeMessage}
            </div>

            <div className='container'>
                {this.state.welcomBean}
            </div>
            </>

            
        );
    }

    retrieveWelcomeMessage(){
        HelloWorldService.executeHelloWorldService()
        .then(response=> this.handleSuccessResponse(response))
        .catch(error=>this.handleErrorResponse(error))
    }

    retrieveWelcomeBean(){
        HelloWorldService.executeHelloWorldBeanService()
        .then(response=> this.handleSuccessResponse(response))
        .catch(error=>this.handleErrorResponse(error))
    }

    retrievePathVar(){
        HelloWorldService.executeHelloWorldBeanPathVariableService(this.props.match.params.name)
        .then(response=> this.handleSuccessResponse(response))
        .catch(error=>this.handleErrorResponse(error))
    }

    handleSuccessResponse(response){
        console.log(response)
        this.setState({welcomeMessage:response.data.message})
    }

    handleErrorResponse(error){
       // console.log(error.response)
        let errorMessage = ''
        if(error.message){
            errorMessage=error.message
        }

        if(error.response&&error.response.data){
            errorMessage=error.response.data.message
        }
        this.setState({welcomeMessage:errorMessage})
    }

    
}

export default WelcomeComponent