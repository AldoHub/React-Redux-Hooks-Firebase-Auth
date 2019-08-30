import React , {useState} from "react";

import { useDispatch } from "react-redux";
import { createUser } from "../actions/signin";
import {Redirect} from "react-router-dom";

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [routeRedirect, setRedirect] = useState("");   
    const dispatch = useDispatch();
    const createUserAction = (email, password) => dispatch(createUser(email, password));


    const signin = async(e) => {
        e.preventDefault()
        if(email !== "" && password !== ""){
            console.log("creating user");
            await createUserAction(email, password);
            setRedirect(true);
        }else{
            console.log("need to fill the credentials")
        }

    } 

    const redirectTo = routeRedirect;
    if(redirectTo){
        return <Redirect to="/" />  
    }


    return(
      
        <React.Fragment>
            <form onSubmit={signin}>
            <p>Create an account.</p>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Create account" />
            </form>
        </React.Fragment>
       
    )

}

export default Signin;