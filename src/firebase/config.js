import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
   
};


class Firebase {
    constructor(){

        firebase.initializeApp(config);
        this.auth=firebase.auth();
        this.db=firebase.firestore();
    }

    async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
        console.log(err);
        });
        return user;
    }

    async signin(email, password){
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
        });
        return user;
    }

    async logout(){
        const logout = await firebase.auth().signOut().catch(err => console.log(err));
        return logout;
    }

    async getPosts(){
        let postsArray = []; 

        const posts = await firebase.firestore().collection("posts").get();
        posts.forEach(doc => {
            postsArray.push({id: doc.id, data: doc.data()});
        }); 
        return postsArray;
    }


    async getPost(postid){
        const post = await firebase.firestore().collection("posts").doc(postid).get();
        const postData = post.data(); 
        return postData;
    }


    async createPost(post){
        const storageRef = firebase.storage().ref();
        // create a child inside the storage
        const storageChild = storageRef.child(post.cover.name);
        const postCover =  await storageChild.put(post.cover);
        const downloadURL = await storageChild.getDownloadURL();
        const fileRef = postCover.ref.location.path;
        
 
        let newPost = {
            title: post.title,
            content: post.content,
            cover: downloadURL,
            fileref : fileRef 
        } 
 
        
        const firestorePost = await firebase.firestore().collection("posts").add(newPost).catch(err => {
            console.log(err);
        });
        
        return firestorePost;
    }


    async updatePost(postid, postData){
        if(postData["cover"]){
            // create a ref to the storage
           const storageRef = firebase.storage().ref();
           // create a child inside the storage
           const storageChild = storageRef.child(postData.cover.name);
           const postCover =  await storageChild.put(postData.cover);
           const downloadURL = await storageChild.getDownloadURL();
           const fileRef = postCover.ref.location.path;
       

           //delete the old cover
           await storageRef.child(postData["oldcover"]).delete().catch(err => {
               console.log(err)
           });
           console.log("image deleted successfully")

           let updatedPost = {
               title: postData.title,
               content: postData.content,
               cover: downloadURL,
               fileref : fileRef 
           } 


           const post = await firebase.firestore().collection("posts").doc(postid).set(updatedPost, {merge: true}).catch(err =>
           {console.log(err)});    
           console.log("post updated successfully");
           return post;
         
       }else{

           const post = await firebase.firestore().collection("posts").doc(postid).set(postData, {merge: true}).catch(err =>
           {console.log(err)});    
           console.log("post updated successfully");
           return post;
        }

        
    }

    async deletePost(postid, fileref){
        const storageRef = firebase.storage().ref();
        await storageRef.child(fileref).delete().catch(err => {
         console.log(err)
         }); 
        
        console.log("Image deleted successfully");
        const post = await firebase.firestore().collection("posts").doc(postid).delete().catch(err => console.log(err));
 
        console.log("post deleted successfully");
        return post;
    }

    async getUserState(){
        return new Promise(resolve=>{
            this.auth.onAuthStateChanged(resolve)
        });
    }

}

export default new Firebase();