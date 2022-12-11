import './Register.scss';
import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {registerAction} from "../../../actions/userActions";
import {ToastContainer} from "react-toastify";
import {USER_REGISTER_RESET} from "../../../constants/userConstants";
import Toast from "../../../widgets/toast/Toast";

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {userInfo: info, error: err, loading} = useSelector(state => state.userAuthentication);
    useEffect(() => {
        if (info) {
            history.push('/admin/home');
        }
    }, [info, loading]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (name && email && password) {
            dispatch(registerAction({name, email, password}));
        }
        else {
            Toast.dangerToast("The required fields can not be empty!");
        }
    };
    const {userInfo, error} = useSelector(state => state.userRegister);
    useEffect(() => {
        if (userInfo) {
            Toast.successToast(userInfo.message);
            dispatch({type: USER_REGISTER_RESET});
            setName("");
            setEmail("");
            setPassword("");
        }
        if (error) {
            Toast.dangerToast(error);
            dispatch({type: USER_REGISTER_RESET});
        }
    }, [userInfo, error]);

    return (
        <div className="register-main-container">
            <div className="register-container">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="card bg-dark text-light">
                                <div className="card-header bg-dark text-light">
                                    Register
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submitHandler}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name<span className="text-danger">*</span></label>
                                            <input value={name} onChange={event => setName(event.target.value)} type="text" placeholder="Full name" id="name"
                                                   className="form-control bg-dark text-light"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
                                            <input value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Email" id="email" className="form-control bg-dark text-light"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>
                                            <input value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" id="password" className="form-control bg-dark text-light"/>
                                        </div>
                                        <input type="submit" className="btn btn-outline-primary form-control"
                                               value="Register"/>
                                        <small className="text-muted">Already have an account? <Link
                                            to="/login">Login</Link></small>
                                    </form>
                                </div>
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

export default Register;
