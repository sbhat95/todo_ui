
import axios from 'axios'
class HelloWorldService{

    executeHelloWorldService(){
        //console.log('executed')
        return axios.get("http://localhost:8080/hello-world");
    }

    executeHelloWorldBeanService(){
        //console.log('executed')
        return axios.get("http://localhost:8080/hello-world-bean");
    }

    executeHelloWorldBeanPathVariableService(name){
        //console.log('executed')
        // let user= 'user'
        // let password='password'
        // let basicAuthHeader = 'Basic '+ window.btoa(user+':'+password)

        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
        // ,
        // {
        //     headers:{
        //         authorization:basicAuthHeader
        //     }
        // }
        );
    }
}
export default new HelloWorldService()