import React from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import AuthService from "../services/AuthService";
import withRouter from '../sub/withRouter';

class Header extends React.Component {

    static contextType = AuthContext;

    handleClick = async (e)=>{
        e.preventDefault()
        const { dispatch, user } = this.context;
        try {
            dispatch({type: 'LOGOUT'})
            await AuthService.logout()
        }catch (e) {
            console.log(e)
        }finally {
            this.props.router.navigate("/login")
        }
    }

    render() {

        const { dispatch, user } = this.context;

        return (
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <header>
                    <div className='collapse navbar-collapse' id="navbarNavAltMarkup">
                        <div class="navbar-nav">

                        <Link to="/" className="nav-item nav-link">Home</Link>
                        <Link to="/operators" className="nav-item nav-link">Operators</Link>

                        {user ?
                            (
                                <>
                                <span className="nav-item nav-link text-white">{user.nickname}</span>
                                <button onClick={this.handleClick} className="nav-item nav-link btn ">Logout</button>
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
}

export default withRouter(Header);