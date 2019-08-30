import firebase from "../firebase/config";

export const updatePost = (postid, postData) => {
 
    return async function(dispatch){
        const post = await firebase.updatePost(postid, postData).catch(err => console.log(err));
        
        if(post){
            dispatch({type: "UPDATE_POST", payload: post});
            return post
        }else{
            console.log("error ocurred");
        }
        
    }
 

}