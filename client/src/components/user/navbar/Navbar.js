import './Navbar.scss';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {authAction, logoutAction} from "../../../actions/userActions";
import {AUTHENTICATION_RESET} from "../../../constants/userConstants";
import {
    FaUserAlt
} from 'react-icons/fa';

const Navbar = ({searchHandler}) => {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        dispatch(authAction());
    }, []);

    const {userInfo, error: authError, loading} = useSelector(state => state.userAuthentication);
    useEffect(() => {
        if (userInfo) {
            setAuthenticated(true);
        }
    }, [userInfo, authError]);

    const logoutHandler = () => {
        dispatch(logoutAction());
        dispatch({type: AUTHENTICATION_RESET});
        setAuthenticated(false);
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid" id="nvabar-container-id">
                <Link to="/" className="navbar-brand" href="#">Video Zone</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <input onChange={event => searchHandler(event.target.value)}
                               className="form-control me-2 bg-dark text-light mt-3 mt-lg-0" type="search" placeholder="Search" aria-label="Search"/>
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        {
                            !authenticated && (
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link" >Login</Link>
                                </li>
                            )
                        }
                        {
                            !authenticated && (
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link" >Register</Link>
                                </li>
                            )
                        }
                        {
                            authenticated && (
                                <li className="nav-item">
                                    <Link to="/admin/profile" className="nav-link" >
                                        <FaUserAlt/>
                                    </Link>
                                </li>
                            )
                        }
                        {
                            authenticated && (
                                <li className="nav-item">
                                    <a onClick={logoutHandler} className="nav-link action-button" >Logout</a>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
