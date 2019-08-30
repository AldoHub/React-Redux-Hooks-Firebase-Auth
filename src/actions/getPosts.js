import firebase from "../firebase/config";

export const getPosts = () => {
 
    return async function(dispatch){

        const postsArray = await firebase.getPosts();
        console.log(postsArray);
        dispatch({type: "GET_POSTS", payload: postsArray});
      
       
    }
 

}