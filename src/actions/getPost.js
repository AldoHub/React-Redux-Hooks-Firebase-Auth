import firebase from "../firebase/config";

export const getPost = (postid) => {
 
    return async function(dispatch){
       const postData = await firebase.getPost(postid);
       dispatch({type: "GET_POST", payload: postData});
       
    }
 

}