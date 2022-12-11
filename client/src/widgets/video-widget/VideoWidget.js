import './VideoWidget.scss';
import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import Avatar from "../avatar/Avatar";
import {
    AiOutlineLike,
    AiOutlineDislike,
    AiFillLike,
    AiFillDislike
} from 'react-icons/ai';
import {
    FaCommentAlt
} from 'react-icons/fa'
import {
    BsThreeDotsVertical
} from 'react-icons/bs';
import Keys from "../../Keys";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../../widgets/toast/Toast";
import {useSelector, useDispatch} from "react-redux";
import {commentDeleteAction, commentUpdateAction, videoGetAction} from "../../actions/videoActions";
import {VIDEO_COMMENT_DELETE_RESET, VIDEO_COMMENT_UPDATE_RESET} from "../../constants/videoConstants";
import {authAction} from "../../actions/userActions";
import {Link} from "react-router-dom";

const VideoWidget = ({videoUrl, owner, videoDetails, likeHandler, dislikeHandler, commentHandler}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [likedByUser, setLikedByUser] = useState(false);
    const [dislikedByUser, setDislikedByUser] = useState(false);
    const [commentId, setCommentId] = useState("");
    const [commenterId, setCommenterId] = useState("");

    const {userInfo, error: authError, loading} = useSelector(state => state.userAuthentication);
    useEffect(() => {
        let tempLike = false;
        let tempDislike = false;
        if (videoDetails.likes && userInfo) {
            for (let i = 0; i < videoDetails.likes.length; i++) {
                if (videoDetails.likes[i].likerId === userInfo.userId) {
                    tempLike = true;
                    break;
                } else {
                    tempLike = false;
                }
            }
            setLikedByUser(tempLike);
            for (let i = 0; i < videoDetails.dislikes.length; i++) {
                if (videoDetails.dislikes[i].dislikerId === userInfo.userId) {
                    tempDislike = true;
                    break;
                } else {
                    tempDislike = false;
                }
            }
            setDislikedByUser(tempDislike);
        }
    }, [videoDetails.likes, userInfo]);

    useEffect(() => {
        if (!userInfo) {
            setLikedByUser(false);
            setDislikedByUser(false);
        }
    }, [userInfo]);

    const commentSubmitAction = (event) => {
        event.preventDefault();
        if (comment) {
            if (!commentId) {
                commentHandler({videoId: videoDetails.videoId, message: comment});
            } else {
                dispatch(commentUpdateAction({commnetId: commentId, message: comment, commenterId: commenterId, videoId: videoDetails.videoId}));
            }
        } else {
            Toast.dangerToast("The fields can not be empty!");
        }
    };

    // To reset comment input field
    const {commentInfo, error: commentAddError, loading: commentAddLoading} = useSelector(state => state.commentAdd);
    useEffect(() => {
        if (commentInfo) {
            setComment("");
        }
    }, [commentInfo]);

    const {commentInfo: commentUpdateInfo, error: commentUpdateError, loading: commentUpdateLoading} = useSelector(state => state.commentUpdate);
    useEffect(() => {
        if (commentUpdateInfo) {
            Toast.successToast(commentUpdateInfo.message);
            dispatch(videoGetAction(videoDetails.videoId));
            dispatch({type: VIDEO_COMMENT_UPDATE_RESET});
            setCommentId("");
            setCommenterId("");
            setComment("");
        }
        if (commentUpdateError) {
            Toast.dangerToast(commentUpdateError);
            dispatch({type: VIDEO_COMMENT_UPDATE_RESET});
        }
    }, [commentUpdateInfo, commentUpdateError]);

    const commentDeleteHandler = () => {
        if (commentId) {
            dispatch(commentDeleteAction(commentId));
        }
    };
    const {commentInfo: commentDeleteInfo, error, loading: commentDeleteLoading} = useSelector(state => state.commentDelete);
    useEffect(() => {
        if (commentDeleteInfo) {
            setCommentId("");
            Toast.successToast(commentDeleteInfo.message);
            dispatch({type: VIDEO_COMMENT_DELETE_RESET});

            dispatch(videoGetAction(videoDetails.videoId));
        }
        if (error) {
            Toast.dangerToast(error);
            dispatch({type: VIDEO_COMMENT_DELETE_RESET});
        }
    }, [commentDeleteInfo, error]);

    const getCommentHandler = (commentData) => {
        setComment(commentData.message);
        setCommenterId(commentData.commenterId);
    };

    return (
        <div className="video-widget-main-container">
            <div className="video-widget-container">
                <div className="row">
                    <div className="avatar-title">
                        {/*avatar*/}
                        <Link to={"/user/" + videoDetails.postedById}>
                            <Avatar image={owner ? Keys.url + "images/" + owner.userImage : ""} radius="60px"/>
                        </Link>
                        {/*video title*/}
                        <h4 className="video-title text-light">{videoDetails.title}</h4>
                    </div>
                    {/*video description*/}
                    <p className="video-description text-light mt-2">{videoDetails.description}....</p>
                    <ReactPlayer
                        url={videoUrl}
                        width='100%'
                        height='100%'
                        controls={true}
                    />
                    <div className="like-comment-container">
                        <div className="like-container">
                            {
                                likedByUser ? (
                                    <AiFillLike size={30} onClick={event => likeHandler()}
                                                className="like-icon action-button"/>
                                ) : <AiOutlineLike size={30} onClick={event => likeHandler()}
                                                   className="like-icon action-button"/>
                            }
                            <span
                                className="like-count text-light">{videoDetails.likes ? videoDetails.likes.length : 0}</span>
                            <span className="bar"></span>
                            {
                                dislikedByUser ? (
                                    <AiFillDislike size={30} className="dislike-icon action-button"
                                                   onClick={event => dislikeHandler()}/>
                                ) : <AiOutlineDislike size={30} className="dislike-icon action-button"
                                                      onClick={event => dislikeHandler()}/>
                            }
                            <span
                                className="like-count text-light">{videoDetails.dislikes ? videoDetails.dislikes.length : 0}</span>
                        </div>
                        <div className="view-container text-light">
                            {videoDetails.viewCounts} views
                        </div>
                    </div>
                    <div className="write-comment-container">
                        <form onSubmit={commentSubmitAction}>
                            <input value={comment} onChange={event => setComment(event.target.value)} type="text"
                                   className="write-comment-field bg-dark text-light" placeholder="Write comment..."/>
                        </form>
                    </div>
                    <div className="comment-list-container mt-4">
                        {
                            videoDetails.comments && (
                                videoDetails.comments.map((comment, k) => (
                                    <div className="comment-item-box" key={k}>
                                        <Link to={"/user/" + comment.commenterId}>
                                            <Avatar
                                                image={comment.commenter && Keys.url + "images/" + comment.commenter.userImage}
                                                radius="50px"/>
                                        </Link>
                                        <div className="comment-name-and-text">
                                            <h4 className="commenter-name text-light">
                                                {comment.commenter.name}
                                                {
                                                    userInfo && (
                                                        comment.commenterId === userInfo.userId && (
                                                            <BsThreeDotsVertical
                                                                onClick={event => setCommentId(commentId === comment.commnetId ? "" : comment.commnetId)}
                                                                className="comment-edit-delete-menu action-button"/>
                                                        )
                                                    )
                                                }
                                            </h4>
                                            {
                                                (commentId === comment.commnetId) && (
                                                    <div className={`text-light comment-edit-delete-button-container`}>
                                                        <button className="comment-edit-button"
                                                                onClick={event => getCommentHandler(comment)}>Edit
                                                        </button>
                                                        <button className="comment-delete-button"
                                                                onClick={commentDeleteHandler}>Delete
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            <p className="comment-text text-light">{comment.message}</p>
                                        </div>
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

export default VideoWidget;
