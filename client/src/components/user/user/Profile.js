import './Profile.scss';
import React from 'react';
import {ToastContainer} from "react-toastify";
import {useState, useEffect} from 'react';
import Keys from "../../../Keys";
import {useDispatch, useSelector} from "react-redux";
import Toast from "../../../widgets/toast/Toast";
import {authAction, userUpdate} from "../../../actions/userActions";
import {USER_UPDATE_RESET} from "../../../constants/userConstants";

const Profile = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previousImage, setPreviousImage] = useState("");

    const {userInfo, error} = useSelector(state => state.userAuthentication);
    useEffect(() => {
        if (userInfo) {
            setPreviousImage(userInfo.userImage ? Keys.url + "images/" + userInfo.userImage : "");
            setName(userInfo.name);
            setEmail(userInfo.email);
            setType(userInfo.type);
            setId(userInfo.userId);
        }
        if (error) {
            Toast.dangerToast(error);
        }
    }, [userInfo]);

    const updateHandler = (e) => {
        e.preventDefault();
        if (name && email) {
            let formData = new FormData();
            formData.append("userId", id);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("type", type);
            if (password) {
                formData.append("password", password);
            }
            if (image !== "") {
                formData.append("ImageFile", image);
            }
            dispatch(userUpdate(formData));
        }
        else {
            Toast.dangerToast("Name and Email fields can not be empty!");
        }
    };

    const {userInfo: updatedInfo, error: updatedError, loading} = useSelector(state => state.userUpdate);
    useEffect(() => {
        if(updatedInfo) {
            Toast.successToast(updatedInfo.message);
            dispatch({type: USER_UPDATE_RESET});
            dispatch(authAction());
        }
        if (updatedError) {
            Toast.dangerToast(updatedError);
            dispatch({type: USER_UPDATE_RESET});
        }
    }, [updatedInfo, updatedError]);

    return (
        <div className={`profile-container`}>
            <title>Dashboard - Profile</title>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="d-flex justify-content-center">
                        <img className="mb-4 user-image" src={previousImage} alt="Profile Picture"/>
                    </div>
                    <form onSubmit={updateHandler}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input value={name} onChange={event => setName(event.target.value)}  type="text"
                                   placeholder="Name" className="form-control bg-dark text-white-50"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input value={email} onChange={event => setEmail(event.target.value)}  type="text"
                                   placeholder="Email" className="form-control bg-dark text-white-50"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={event => setPassword(event.target.value)}  type="password"
                                   placeholder="Password" className="form-control bg-dark text-white-50"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image" className="form-label">Profile Image</label>
                            <input onChange={event => setImage(event.target.files[0])} type="file" className="form-control bg-dark text-white-50"/>
                        </div>
                        {
                            loading && (
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                        }
                        <input type="submit" className="btn btn-outline-success form-control"
                               value="Update"/>
                    </form>
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

export default Profile;
