const createPost=(
    state = {
    post: {} 
    }, 
    action)=>{
        if(action.type === "CREATE_POST"){
            state= {...state, post: action.payload}
        }
        return state;
    };
   
export default createPost;