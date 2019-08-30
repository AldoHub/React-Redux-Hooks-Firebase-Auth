const logoutUser=(
    //initial state
    state = {
    user: {} 
    }, 
    action)=>{
        if(action.type === "LOGOUT_USER"){
            state= {...state, user: action.payload}
        }
      
        return state;
    };
   
export default logoutUser;