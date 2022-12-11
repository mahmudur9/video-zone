import './Video.scss';
import React from 'react';
import VideoWidget from "../../../widgets/video-widget/VideoWidget";
import Keys from "../../../Keys";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../../../widgets/toast/Toast";
import {
    commentAddAction,
    disLikeAction,
    likeAction,
    videoGetAction,
    viewCountAddAction
} from "../../../actions/videoActions";
import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {VIDEO_COMMENT_RESET, VIDEO_DISLIKE_RESET, VIDEO_LIKE_RESET} from "../../../constants/videoConstants";
import Navbar from "../navbar/Navbar";

const Video = () => {
    const [item, setItem] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const {id: eid} = useParams();

    useEffect(() => {
        dispatch(videoGetAction(eid));

        dispatch(viewCountAddAction(eid));
    }, []);
    const {videoInfo, error} = useSelector(state => state.videoGet);
    const showVideos = () => {
        if (videoInfo) {
            setItem(videoInfo);
            // console.log(videoInfo);
        }
        if (error) {
            Toast.dangerToast(error);
        }
    };
    useEffect(() => {
        showVideos();
    }, [videoInfo]);

    const {userInfo, error: authError, loading} = useSelector(state => state.userAuthentication);
    const likeHandler = () => {
        if (userInfo) {
            dispatch(likeAction({videoId: eid, likerId: userInfo.userId}));
        }
        if (authError) {
            history.push("/login")
        }
    };
    const {likeInfo, error: likeError, loading: loadingError} = useSelector(state => state.like);
    useEffect(() => {
        if (likeInfo) {
            Toast.successToast(likeInfo.message);
            dispatch(videoGetAction(eid));
            dispatch({type: VIDEO_LIKE_RESET});
        }
        if (likeError) {
            Toast.dangerToast(likeError);
            dispatch({type: VIDEO_LIKE_RESET});
        }
    }, [likeInfo, likeError]);

    const dislikeHandler = () => {
        if (userInfo) {
            dispatch(disLikeAction({videoId: eid, dislikerId: userInfo.userId}));
        }
        if (authError || !userInfo) {
            history.push("/login")
        }
    };

    const {dislikeInfo, error: dislikeError, loading: dislikeLoadingError} = useSelector(state => state.dislike);
    useEffect(() => {
        if (dislikeInfo) {
            Toast.successToast(dislikeInfo.message);
            dispatch(videoGetAction(eid));
            dispatch({type: VIDEO_DISLIKE_RESET});
        }
        if (dislikeError) {
            Toast.dangerToast(dislikeError);
            dispatch({type: VIDEO_DISLIKE_RESET});
        }
    }, [dislikeInfo, dislikeError]);

    const commentHandler = (comment) => {
        if (userInfo) {
            comment["commenterId"] = userInfo.userId;
            dispatch(commentAddAction(comment));
        }
        if (authError || !userInfo) {
            history.push("/login")
        }
    };

    const {commentInfo, error: commentAddError, loading: commentAddLoading} = useSelector(state => state.commentAdd);
    useEffect(() => {
        if (commentInfo) {
            Toast.successToast(commentInfo.message);
            dispatch({type: VIDEO_COMMENT_RESET});
            dispatch(videoGetAction(eid));
        }
        if (commentAddError) {
            Toast.dangerToast(commentAddError);
            dispatch({type: VIDEO_COMMENT_RESET});
        }
    }, [commentInfo, commentAddError]);

    return (
        <div className="video-main-container">
            <Navbar/>
            <div className="video-container">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                       <div className="col-md-8 pb-3">
                           {
                               item ?
                                   (
                                       <VideoWidget
                                           videoUrl={Keys.url + Keys.videos_uri + 'watch?url=' + item.url}
                                           owner={item.postedBy}
                                           videoDetails={item}
                                           likeHandler={likeHandler}
                                           dislikeHandler={dislikeHandler}
                                           commentHandler={commentHandler}
                                       />
                                   )
                                   : null
                           }
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

export default Video;
