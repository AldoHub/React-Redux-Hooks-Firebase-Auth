import {combineReducers} from "redux";
import createUser from "./signin";
import loginUser from "./login";
import logoutUser from "./logout";
import createPost from "./create";
import getPosts from "./getPosts";
import getPost from "./getPost";
import updatePost from "./updatePost";
import deletePost from "./deletePost";


const reducers= combineReducers({
    signIn: createUser,
    logIn: loginUser,
    logOut: logoutUser,
    create: createPost,
    posts: getPosts,
    post: getPost,
    update: updatePost,
    delete: deletePost,
  

});

export default reducers;