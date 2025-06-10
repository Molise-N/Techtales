import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../api";
import { useState, useEffect } from "react";
import { getImage } from "../api";

export function ReadBlog() { 
  const [post, setPost] = useState({})

  let params = useParams()
  const navigate = useNavigate()
  let id = params.id
  
  useEffect(()=>{
    async function loadPost(){
      let data = await getPost(id)
      let date = new Date(data.dateCreated)
      data.dateCreated = date.toString()
      
      setPost(data)
    }
    loadPost()
  },[])
  return (
    <>
      <button onClick={()=>navigate(-1)}>back</button>
      <h1>{post.title}</h1>
      <h2>{post.description}</h2>
      <img src={post.image.data}  />
      <h3>{post.dateCreated?.slice(0,15)}</h3>
      <p>{post.content}</p>
    </>
  );
  }