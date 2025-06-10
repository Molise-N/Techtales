import { useState } from "react";
import { CreateUser } from "../components/CreateUser";
import { Login } from "../components/Login";


export function Landing() {
    //view == 0  ->login
    //view == 1 ->create user
    const [view, setView] = useState(0)
    return (
    <>
      {!view? 
      <>
        <Login/> 
        <button onClick={()=>setView(!view)}>create new account</button>
      </>: 
      <>
        <CreateUser/>
        <button onClick={()=>setView(!view)}>login existing account</button>
      </>}

    </>
    );
  }