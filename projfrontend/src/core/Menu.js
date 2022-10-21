import React from 'react'
import { 
    Link,
    useNavigate 
} from "react-router-dom"
import { signout, isAuthenticated } from '../auth/helper';

export default function Menu({history}) {
    const location = useNavigate();

    const currentTab = (path) =>{
        if(location.pathname === path) {
            return { color: "#2ecc72" }
        } else {
            return { color: "#FFFFFF" } 
        }
    }    
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={ currentTab( "/") } className='nav-link' to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={ currentTab( "/cart") } className='nav-link' to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link style={ currentTab( "/user/dashboard") } className='nav-link' to="/user/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link style={ currentTab( "/admin/dashboard") } className='nav-link' to="/admin/dashboard">A.Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link style={ currentTab("/signup") } className='nav-link' to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link style={ currentTab("/signin") } className='nav-link' to="/signin">Signin</Link>
                </li>
                {/* <li className="nav-item">
                    <Link style={ currentTab("/signout") } className='nav-link' to="/signout">Signout</Link>
                </li> */}
                {console.log(isAuthenticated())}
                {
                    isAuthenticated() && (
                        <li className="nav-item">
                            {/* <Link className='nav-link' to="/signout">Signout</Link> */}
                            <span 
                            className='nav-link text-warning' 
                            onClick={ () => {
                                signout(() => {
                                    location("/")
                                })
                            }}>
                                Signout
                            </span>
                        </li>   
                    )
                }
            </ul>
        </div>   
    )
}
