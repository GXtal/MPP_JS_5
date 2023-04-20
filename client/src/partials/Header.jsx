import React, {useContext} from 'react';
import {AuthContext} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function Header(props) {
    const { user, logout } = useContext(AuthContext)


    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        await logout()
    }

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <header>
                <div className='collapse navbar-collapse' id="navbarNavAltMarkup">
                    <div className="navbar-nav">

                        <Link to="/" className="nav-item nav-link">Home</Link>
                        <Link to="/operators" className="nav-item nav-link">Operators</Link>

                        {user ?
                            (
                                <>
                                    <span className="nav-item nav-link text-white">{user.nickname}</span>
                                    <button onClick={handleClick} className="nav-item nav-link btn ">Logout</button>
                                </>)
                            :
                            (
                                <div className="input-group">
                                    <Link to="/login" className="nav-item nav-link">Login</Link>
                                    <Link to="/register" className="nav-item nav-link">Sign-up</Link>
                                </div>
                            )
                        }
                    </div>

                </div>


            </header>
        </div>
    );

}

export default Header;