import { useState, useEffect, useRef} from "react";
import { createPost } from "../api";

 
export function CreateBlog() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("") 
    const [file, setFile] = useState()

    const MAX_FILE_SIZE = 15000000 //15 mb

    const inputFile = useRef(null )

    async function handleSubmit(e){
      e.preventDefault()
      let submitObject ={
        title: title,
        description: description,
        content: content,
        author: null,
        dateCreated: new Date(),
        file: file
      }
      await createPost(submitObject)

    }

    function handleFileUpload(e){
      const file =e.target.files[0]
      const fileExtension = file.name.substring(file.name.lastIndexOf("."))
      if(fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png"){
        alert("files must be jpg or png")
        inputFile.current.value = ""
        inputFile.current.type = "file"
        return
      }
      if(file.size > MAX_FILE_SIZE){
        alert("file size exceeds the limit (15 mb)")
        inputFile.current.value = ""
        inputFile.current.type = "file"
        return
      }
        

      setFile(file)
    }

    return (
    <form onSubmit={handleSubmit}>
      <label>Blog post title: </label>
      <input onChange={(e)=>setTitle(e.target.value)} maxLength={100} required name="title" />
      <label>Blog description: </label>
      <input onChange={(e)=>setDescription(e.target.value)} maxLength={200} required name="description" />
      <label>Blog content: </label>
      <textarea onChange={(e)=>setContent(e.target.value)}  maxLength={5000} required name="content" />
      <label>Insert Header Image: </label>
      <input type="file" onChange={handleFileUpload} ref={inputFile} required />
      <button type="submit">Submit</button>

    </form>
    );
  }