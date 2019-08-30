import React , {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPost } from "../actions/getPost";
import { updatePost } from "../actions/update";
import { deletePost } from "../actions/deletePost";
import {Redirect} from "react-router-dom";
import firebase from "../firebase/config";

const Post = (props) => {
    const loginSelector = useSelector((state) => state.logIn)
    const signinSelector = useSelector((state) => state.signIn)

    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(null);

    const [defaultTitle, setDefaultTitle] = useState("");
    const [defaultContent, setDefaultContent] = useState("");
    const [fileref, setFileRef] = useState("");
    const [routeRedirect, setRedirect] = useState("");
    
    const [isBusy, setIsBusy] = useState(false);

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const fileRef = useRef(null);
    
    const [postid, setPostId] = useState("");

    const getPostSelector = useSelector((state) => state.post)
    const dispatch = useDispatch();

    const getPostAction = (postid) => dispatch(getPost(postid));
    const updatePostAction = (postid, post) => dispatch(updatePost(postid, post));
    const deletePostAction = (postid, fileref) => dispatch(deletePost(postid, fileref));
   

    let currentPost;
    let editButton;
    let deleteButton;


    useEffect(() => {
        setTimer(true)
        setPostId(props.match.params.id);
        getPostAction(props.match.params.id);
      
            firebase.getUserState().then(user => {
             setUserState(user);
            })
      
        setTimeout(() => setTimer(false), 1000)
    },{})

   
    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }

    const updateCurrentPost = async(e) => {
        e.preventDefault();
        setIsBusy(true);
        const post = {
            id: postid,
            title: titleRef.current.value,
            content: contentRef.current.value,
        }

        if(fileRef.current.files.length > 0){
            post["cover"] = fileRef.current.files[0];
            post["oldcover"] = getPostSelector.post.fileref;
        }
        
        let updatedRes = await updatePostAction(postid, post);
        setIsBusy(false);
        setRedirect(true);
        
      
    }


    const editPost= () => {
        setDefaultTitle(getPostSelector.post.title);        
        setDefaultContent(getPostSelector.post.content);
        setFileRef(getPostSelector.post.fileref); 
        setEditMode(!editMode);
       
    }

    const deleteCurrentPost = async() =>{
        await deletePostAction(postid, fileref);   
        setRedirect(true);
    }

    let updateForm;
    if(editMode){
        if(loginSelector.user.hasOwnProperty("user") || signinSelector.user.hasOwnProperty("user") || userState != null && isBusy == false){
            deleteButton = <button className="delete" onClick={(e) => deleteCurrentPost()}>Delete Post</button>
        }
        if(isBusy){
          updateForm =    <div className="processing">
                        <p>Request is being processed</p>
                        <div className="loader">Loading...</div>
                        </div>  
        }else{
            updateForm =   
                        <React.Fragment>
                        <form className="editForm" onSubmit={updateCurrentPost}>
                            <p>Update the current post</p>
                                
                                <label htmlFor="title">Post Title: </label>
                                <input type="text" name="title" ref={titleRef} defaultValue={defaultTitle} />
                                
                                <label htmlFor="content">Post Content: </label>
                                <textarea name="content" ref={contentRef} defaultValue={defaultContent} ></textarea>
                            
                                <label htmlFor="cover" className="cover">Cover</label>
                                <input type="file" ref={fileRef} />

                                <input type="submit" value="update post" />

                        </form>
                        </React.Fragment>
        }
        
    } 



    if(timer){
        currentPost = <div className="loader">Loading...</div>
    }else{
       if(loginSelector.user.hasOwnProperty("user") || signinSelector.user.hasOwnProperty("user") || userState != null){
        editButton = <button className="edit" onClick={(e) => editPost()}>Edit Post</button>
     
       }
       
        currentPost = <div className="single">

            <img src={getPostSelector.post.cover} />

            <h2>{getPostSelector.post.title}</h2>
            <p>{getPostSelector.post.content}</p>
           
           {editButton}
           {updateForm}
           {deleteButton}
        </div>
    }

    return(
        <React.Fragment>

        {currentPost}
      
       
        </React.Fragment>
    )
}

export default Post;