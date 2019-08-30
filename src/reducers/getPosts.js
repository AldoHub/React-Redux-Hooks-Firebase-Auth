const getPosts=(
    state = {
    posts: [] 
    }, 
    action)=>{
        if(action.type === "GET_POSTS"){
            state= {...state, posts: action.payload}
        }
        return state;
    };
   
export default getPosts;