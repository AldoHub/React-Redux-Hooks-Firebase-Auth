const updatePost=(
    state = {
    post: {} 
    }, 
    action)=>{
        if(action.type === "UPDATE_POST"){
            state= {...state, post: action.payload}
        }
        return state;
    };
   
export default updatePost;