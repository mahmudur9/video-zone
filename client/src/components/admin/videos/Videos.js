import './Videos.scss';
import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import VideoCard from "../../../widgets/video-card/VideoCard";
import {deleteVideoAction} from "../../../actions/videoActions";
import Toast from "../../../widgets/toast/Toast";
import {ToastContainer} from "react-toastify";
import {VIDEO_DELETE_RESET} from "../../../constants/videoConstants";
import {authAction} from "../../../actions/userActions";

const Videos = () => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);

    useEffect(() => {
        dispatch(authAction());
    }, []);

    const {userInfo, error, loading} = useSelector(state => state.userAuthentication);
    useEffect(() => {
        if (userInfo) {
            setItems(userInfo.videos);
        }
    }, [userInfo]);

    const deleteVideoHandler = (id) => {
        if (id) {
            dispatch(deleteVideoAction(id));
        }
    };
    const {videoInfo, error: deleteVideoError} = useSelector(state => state.videoDelete);
    useEffect(() => {
        if (videoInfo) {
            Toast.successToast(videoInfo.message);
            dispatch(authAction());
            dispatch({type: VIDEO_DELETE_RESET});
        }
        if (deleteVideoError) {
            Toast.dangerToast(deleteVideoError);
            dispatch({type: VIDEO_DELETE_RESET});
        }
    }, [videoInfo, deleteVideoError]);

    return (
        <div className="videos-container">
            <div className="mb-3">
                <Link to="/admin/video/add" className="btn btn-danger text-light">Upload Video</Link>
            </div>
            <div className="row">
                {
                    userInfo && (
                        items.map((item, i) => (
                            <div className="col-md-4 col-lg-3 col-sm-6 mb-4" key={i}>
                                <VideoCard
                                    title={item.title}
                                    owner={userInfo}
                                    views={item.viewCounts}
                                    thumbnail={item.thumbnailUrl}
                                    action={true}
                                    deleteVideo={deleteVideoHandler}
                                    videoId={item.videoId}
                                />
                            </div>
                        ))
                    )
                }
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

export default Videos;
