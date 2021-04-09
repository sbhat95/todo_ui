

function ShowFailure(props){
   
    if(props.hasLoginFailed){
        return(
        <div className="alert alert-warning">Invalid Credentials</div>
        );
    }
    else{
        return(null)
    }
}

export default ShowFailure