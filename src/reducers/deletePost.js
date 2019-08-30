const deletePost=(
    state = {
    post: {} 
    }, 
    action)=>{
        if(action.type === "DELETE_POST"){
            state= {...state, post: action.payload}
        }
        return state;
    };
   
export default deletePost;