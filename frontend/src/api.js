import axios from "axios";

const URL = "http://localhost:3000"

//POSTS API TO CALL BACKEND ROUTES
//https://localhost:3000/posts
//#1
export async function getPosts() {
    const response = await axios.get(`${URL}/posts`);
    if(response.status === 200){
        return response.data;
    }else{
        return
    }
    
}
//#2
export async function getPost(id) {
    const response = await axios.get(`${URL}/posts/${id}`);

    const post = response.data
    const data = await getImage(post.imageId)
    
    post.image = data
    return post
   

    if(response.status === 200){
        return response.data;
    }else{
        return
    }
    
}
//#3
export async function createPost(post) {

    const data = await createImage(post.file)
    const imageId = post.file.name

    post.imageId = imageId

    const response = await axios.post(`${URL}/posts`, post);
    return response;
    
}
//#4
export async function updatePost(id,post) {
    const response = await axios.put(`${URL}/posts/${id}`, post);
    return response;
    
}
//#5
export async function deletePost(id) {
    const response = await axios.delete(`${URL}/posts/${id}`);
    return response;
    /*if(response.status === 200){
        return response.data;
    }else{
        return
    } */
    
}

//USERS API TO CALL BACKEND ROUTES
//https://localhost:3000/users
//#1 -- RETRIEVE USER
export async function getUser(id) {
    const response = await axios.get(`${URL}/users/${id}`);
    if(response.status === 200){
        return response.data;
    }else{
        return
    }
    
}
//#2 -- CREATE USERS
export async function createUser(user) {

    const response = await axios.post(`${URL}/users`, user);
    return response;
    
}
//#3 -- UPDATE USERS
export async function updateUser(id,user) {
    const response = await axios.put(`${URL}/users/${id}`, user);
    return response;
    
}
export async function verifyUser(user) {
    try {
        const response = await axios.post(`${URL}/users/login`, user);

        console.log("API Response:", response.data);  // Debugging

        // Ensure the backend response has a `success` field
        if (response.data && response.data.success) {
            return response.data.token;
        } else {
            throw new Error(response.data.message || "Login failed, but no error message provided.");
        }
    } catch (error) {
        console.error("Login request failed:",   error.response ? error.response.data : error.message);

        // Throw a proper error message
        throw new Error(error.response?.data?.message || error.message || "Unknown error occurred.");
    }
}

/* export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`, user);
    console.log(response)
    if(response.data.success){
        return response.data.user
    }else{
        throw new Error(response.statusText)
    }
    
} */

export async function createImage(file){
    const formData = new FormData()
    formData.append("image", file)
    const response = await axios.post(`${URL}/images`, formData, {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    });
    return response

}
export async function getImage(id){
    const response = await axios.get(`${URL}/images/${id}`);
    return response

}