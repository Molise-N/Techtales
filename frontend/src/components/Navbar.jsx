import { Link, useNavigate } from "react-router-dom";
import { PageData } from "./PageData";

export function Navbar(){
    const navigate = useNavigate()
    
    function handleLogout(){
        sessionStorage.removeItem("User")
        navigate("/")
    }
    return(
        <div className="navbar">
            {PageData.map((page)=>{
                return(
                    <Link to={page.path} className="navItem" key={page.path}>
                        <button type="button">
                            {page.name}
                        </button>
                    </Link>
                )
            })}
            <button onClick={handleLogout}>logout</button>

        </div>
    )

}