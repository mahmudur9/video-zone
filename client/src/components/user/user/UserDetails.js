import './UserDetails.scss';
import React from 'react';
import Navbar from "../navbar/Navbar";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userGetAction} from "../../../actions/userActions";
import {useParams} from 'react-router-dom';
import Keys from "../../../Keys";
import VideoCard from "../../../widgets/video-card/VideoCard";

const UserDetails = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [previousImage, setPreviousImage] = useState("");
    const {id: eid} = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        dispatch(userGetAction(eid));
    }, []);
    const {userInfo, error, loading} = useSelector(state => state.userGet);
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPreviousImage(userInfo.userImage);
            setItems(userInfo.videos);
        }
        if (error) {

        }
    }, [userInfo, error]);

    return (
        <div className="user-details-main-container">
            <Navbar/>
            <div className="user-details-container">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="d-flex justify-content-center">
                                <img className="mb-4 user-image" src={previousImage ? Keys.url + "images/" + previousImage : ""} alt="No picture uploaded yet"/>
                            </div>
                            <div>
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className="form-label text-light">Name</label>
                                    <input value={name}  type="text"
                                           placeholder="Name" className="form-control disabled" disabled/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label text-light">Email</label>
                                    <input value={email}  type="text"
                                           placeholder="Email" className="form-control disabled" disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="text-light"/>
                    <div className="row">
                        <h4 className="text-light text-center mb-3">{items.length > 0 ? `Uploaded by ${name}` : `${name} don't have any video`}</h4>
                        {
                            (userInfo && items.length > 0) && (
                                items.map((item, i) => (
                                    <div className="col-md-4 col-lg-3 col-sm-6 mb-4" key={i}>
                                        <VideoCard
                                            title={item.title}
                                            owner={userInfo}
                                            views={item.viewCounts}
                                            thumbnail={item.thumbnailUrl}
                                            action={false}
                                            videoId={item.videoId}
                                        />
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
