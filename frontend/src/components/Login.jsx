
import { verifyUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"



export function Login(){
    const [user, setUser] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate(   )

    async function handleChange(e) {
        setUser({...user,[e.target.name]: e.target.value})
    }
    
    
    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(user)
        if(response){
            sessionStorage.setItem("User",response)
            axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
            navigate("/home")
            
        }else{
            alert("Invalid credentials")
        }
        
  
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" onChange={handleChange} required maxLength={30} placeholder={"email"} />
            <input type="password" name="password" onChange={handleChange} required maxLength={30} placeholder={"password"} />
            <button type="submit">Log in</button>
        </form>
    )
}