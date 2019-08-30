import firebase from "../firebase/config";

export const createPost = (post) => {
 
    return async function(dispatch){
        const firestorePost = await firebase.createPost(post);
        dispatch({type: "CREATE_POST", payload: firestorePost});
    }
 

}