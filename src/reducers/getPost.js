const getPost=(
    state = {
    post: {} 
    }, 
    action)=>{
        if(action.type === "GET_POST"){
            state= {...state, post: action.payload}
        }
        return state;
    };
   
export default getPost;