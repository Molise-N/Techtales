
import { createUser } from "../api"
import { useState, useEffect } from "react"


export function CreateUser(){
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    async function handleChange(e) {
        setUser({...user,[e.target.name]: e.target.value})
    }
    
    
    async function handleSubmit(e) {
        e.preventDefault()
        let response = await createUser(user)
        if(response.status !==200){
            alert("user account can not be created :(")

        }      
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={handleChange} required maxLength={30} placeholder={"name"} />
            <input type="text" name="email" onChange={handleChange} required maxLength={30} placeholder={"email"} />
            <input type="text" name="password" onChange={handleChange} required maxLength={30} placeholder={"password"} />
            <button type="submit">Create Account</button>
        </form>
    )
}