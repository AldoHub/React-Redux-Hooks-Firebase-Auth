import React , {useState} from "react";

import { useDispatch } from "react-redux";
import { loginUser } from "../actions/login";
import {Redirect} from "react-router-dom";

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect,setRedirect] = useState(false);
   
    const dispatch = useDispatch();
    const logInUserAction = (email, password) => dispatch(loginUser(email, password));


    const login = async(e) => {
        e.preventDefault()
        
        if(email !== "" && password !== ""){
            console.log("login user in");
            let user = await logInUserAction(email, password);
            if (user){
              setRedirect(true);
            }
            
        }else{
            console.log("need to fill the credentials")
        }
        
    } 

    const redirectTo = redirect;
    if(redirect){
        return <Redirect to="/" />  
    }


    return(
      
        <React.Fragment>
            <form onSubmit={login}>
            <p>Welcome back.</p>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Login" />
            </form>
          
        </React.Fragment>
       
    )

}

export default Signin;