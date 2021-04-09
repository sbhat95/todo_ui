import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import AuthenticationService from './AuthenticationService'
import ToDoDataService from '../../api/todo/ToDoDataService'
class ToDoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description:'',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)
    }

    onSubmit(values){
        let user = AuthenticationService.getLoggedInUser();
        let todo={
            id:this.state.id,
            description:values.description,
            targetDate:values.targetDate
        }
        console.log('logged in use is '+user)
        if(this.state.id===-1){
            ToDoDataService.addATodo(user,todo).then(()=>this.props.history.push('/todos'))
        }
        ToDoDataService.updateATodo(user, this.state.id,todo)
        .then(()=>this.props.history.push('/todos'))
        console.log(values)
    }

    validate(values){
        let errors={}
        if(!values.description){
            errors.description='Enter a description'
        } else if(values.description.length<5){
            errors.description='Enter atleast 5 characters'
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate="Enter a valid date"
        }
        return errors
    }

    componentDidMount(){
        let user = AuthenticationService.getLoggedInUser();
        ToDoDataService.fetchAToDo(user, this.state.id)
        .then(response =>this.setState({
            description:response.data.description,
            targetDate:moment(response.data.targetDate).format('YYYY-MM-DD')
        }))
    }
    render(){

        let {description, targetDate} = this.state
        return(
            <div>
              
                    <h1>ToDo</h1>
                    <div className="container">
                        <Formik
                        
                        initialValues={{description,targetDate}}
                        onSubmit={this.onSubmit}
                       
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                        >
                            {
                                (props)=>(
                                    <Form>
                                        <ErrorMessage name ="description" component ="div" className="alert alert-warning" />
                                        <ErrorMessage name ="targetDate" component ="div" className="alert alert-warning" />
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"></Field>

                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name="targetDate"></Field>
                                        </fieldset>

                                        <button className="btn btn-success" type="submit">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                
            </div>
        )
    }
}

export default ToDoComponent