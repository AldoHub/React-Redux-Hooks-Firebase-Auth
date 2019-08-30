import React ,{useState}  from "react";
import { Redirect } from 'react-router';
import { useDispatch } from "react-redux";
import { createPost } from "../actions/create";


const Create = () =>{

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");

    const [routeRedirect, setRedirect] = useState("");   
    const [loading, setLoading] = useState(false);
  
    const dispatch = useDispatch();
    const createPostAction = (post) => dispatch(createPost(post));
  

    const addPost = async(e) =>{
        e.preventDefault();
        setLoading(true);
        let post = {
            title,
            content, 
            cover: cover[0]
        }

        await createPostAction(post);
        setLoading(false);
        setRedirect(true);
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }

    let form;
   
    if(loading){
        form = 
        <div className="processing">
            <p>Request is being processed</p>
            <div className="loader">Loading...</div>
        </div>
    }else{
        form = <form onSubmit={addPost}>
        <p>Create a new post</p>
            
            <label htmlFor="title">Post Title: </label>
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
            
            <label htmlFor="content">Post Content: </label>
            <textarea name="content"  onChange={(e) => setContent(e.target.value)}  ></textarea>
           
            <label htmlFor="cover" className="cover">Cover</label>
            <input type="file" onChange={(e) => setCover(e.target.files)} />

            <input type="submit" value="create post" />



        </form>
    }
    return(
        <React.Fragment>
            {form}
        </React.Fragment>
    )
}

export default Create;