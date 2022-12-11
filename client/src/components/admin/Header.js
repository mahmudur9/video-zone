import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {authAction, logoutAction} from "../../actions/userActions";
import {AUTHENTICATION_RESET} from "../../constants/userConstants";
import Keys from "../../Keys";

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [picture, setPicture] = useState("");

    useEffect(() => {
        dispatch(authAction());
    }, []);

    const {userInfo, error, loading} = useSelector(state => state.userAuthentication);
    useEffect(() => {
        if (error) {
            console.log(error);
            history.push('/login');
        }
        if (userInfo) {
            setPicture(userInfo.userImage ? Keys.url + "images/" + userInfo.userImage : "");
        }
    }, [error, userInfo]);

    const logout = () => {
        dispatch(logoutAction());
        dispatch({type: AUTHENTICATION_RESET});
        history.push('/login');
    };

    // Sidebar toggle
    const sidebarToggle = () => {
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    };

    return (
        <nav className="sb-topnav navbar navbar-expand card-header navbar-dark bg-dark" style={{borderRadius: 0}}>
            {/* Navbar Brand*/}
            <Link className="navbar-brand ps-3 text-lg-center" to="/admin/home">Admin</Link>
            {/* Sidebar Toggle*/}
            {/*<button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle"*/}
            <button onClick={sidebarToggle} className="btn btn-link btn-sm order-1 order-lg-0 me-lg-0" id="sidebarToggle"
                    ><FontAwesomeIcon icon={faBars}/></button>
            {/*<ul className="text-light navbar-nav ms-auto me-lg-4">*/}
            <ul className="text-light navbar-nav ms-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img className="dropdown-logo" src={picture} alt="Profile Picture"/></a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/admin/profile">Profile</Link></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a onClick={event => logout()} className="dropdown-item action-button">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
