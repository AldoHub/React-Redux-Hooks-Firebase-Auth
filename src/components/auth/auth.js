import React from 'react';
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import firebase from "../../firebase/config";



const Auth = (Component) => {
          
    class Auth extends React.Component {
       
        componentDidMount = async() => {
    
            let userStatus = {}; 

            await firebase.getUserState().then(user => {
                if(user){
                    userStatus = user;
                }
               
            })

            


            if((Object.keys(this.props.loggedIn).length === 0) && (Object.keys(this.props.signedIn).length === 0) && (Object.keys(userStatus).length === 0)){
                console.log("user is not set");
                console.log(userStatus)
                this.props.history.push('/login');
            }

           

        }


        render() {
        return (
            <Component {...this.props} />
        );
        }
    }

       
    function mapStateToProps(state){
        //state.ReducerName.reducerProperty
        return{
            loggedIn: state.logIn.user,
            signedIn: state.signIn.user
        }
    }
    return connect(mapStateToProps, "")(withRouter(Auth));
   
} 

export default Auth;