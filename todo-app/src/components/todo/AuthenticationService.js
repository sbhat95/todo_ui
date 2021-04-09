import axios from "axios";
import { API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
class AuthenticationService {

    executeBasicAuthenticationService(username, password){
        console.log(username+' : '+password)
       return axios.get(`${API_URL}/basicauth`,
        {
            headers:{
                        authorization:this.createBasicAuthToken(username, password)
                     }
        })
    }

    executeJwtAuthenticationService(username, password){
        console.log(username+' : '+password)
       return axios.post(`${API_URL}/authenticate`,
        {
           username,password
        })
    }

    createBasicAuthToken(username, password){
        return 'Basic '+ window.btoa(username+':'+password)
    }

    createJwtAuthToken(token){
        return 'Bearer '+ token
    }

    registerSuccessfulLogin(username, password){
        console.log('registerSuccessfulLogin');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setUpAxiosInterceptor(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulJwtLogin(username, token){
        console.log('registerSuccessfulJwtLogin');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setUpAxiosInterceptor(this.createJwtAuthToken(token));
    }

    logOut(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null){
            console.log('false')
            return false
        }
        else{
            console.log('true')
            return true
        }
    }

    getLoggedInUser(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return ''
        else return user;
    }

    setUpAxiosInterceptor(token){
        console.log("Interceptor :"+token)
         axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn()){
                config.headers.authorization=token
                }
                return config
            }
           
        )
        
    }
}

export default new AuthenticationService()