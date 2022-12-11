import './Login.scss';
import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Toast from "../../../widgets/toast/Toast";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from 'react-redux';
import {authAction, loginAction} from "../../../actions/userActions";
import {USER_LOGIN_RESET} from "../../../constants/userConstants";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        dispatch(authAction());
    }, []);
    const {userInfo: info, error: err, loading} = useSelector(state => state.userAuthentication);
    useEffect(() => {
        if (info) {
            history.push('/admin/home');
        }
    }, [info, err, loading]);

    const login = (event) => {
        event.preventDefault();
        if (email !== "" && password !== "") {
            dispatch(loginAction(email, password));
        }else {
            Toast.dangerToast("The fields can not be empty!");
        }
    };
    const {userInfo, error} = useSelector(state => state.userLogin);
    useEffect(() => {
        if (userInfo) {
            dispatch({type: USER_LOGIN_RESET});
            history.push('/admin/home');
        }
        if (error) {
            Toast.dangerToast(error);
            dispatch({type: USER_LOGIN_RESET});
        }
    }, [userInfo, error]);

    return (
        <div className="login-container">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="card bg-dark text-light">
                            <div className="card-header bg-dark text-light">
                                Login
                            </div>
                            <div className="card-body">
                                <form onSubmit={login}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input onChange={event => setEmail(event.target.value)} type="text" placeholder="Email" id="email" className="form-control bg-dark text-light"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" id="password"
                                               className="form-control bg-dark text-light"/>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input bg-dark text-light" id="exampleCheck1"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Remember</label>
                                    </div>
                                    <input type="submit" className="btn btn-outline-primary form-control"
                                           value="Login"/>
                                    <small className="text-muted"><Link
                                        to="/register">You don't have any account?</Link></small>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Login;
