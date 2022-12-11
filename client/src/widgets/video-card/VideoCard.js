import './VideoCard.scss';
import React from 'react';
import ThumbnailImage from '../../assets/images/avatar.jpg';
import Avatar from "../avatar/Avatar";
import Keys from "../../Keys";
import {
    FaEdit
} from 'react-icons/fa'
import {
    AiFillDelete
} from 'react-icons/ai'
import {Link} from "react-router-dom";

const VideoCard = ({title, owner, views, thumbnail, action, deleteVideo, videoId}) => {

    return (
        <div className="video-card-main-container">
            <div className="video-card-container">
                <div className="card bg-dark text-light">
                    <div className="thumbnail-image-container">
                        <Link to={videoId ? "/video/" + videoId : ""}>
                            <img src={Keys.url + "thumbnails/" + thumbnail} alt="Thumbnail" className="card-img-top"/>
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="video-avatar-title-container">
                            <Link to={"/user/" + owner.userId}>
                                <Avatar radius="40px" image={Keys.url + "images/" + owner.userImage}/>
                            </Link>
                            <div className="title-description-container">
                                <h6 className="video-title">{title}</h6>
                                <p className="publisher-name">{owner.name}</p>
                                <div className="views-count-publishing-time-container">
                                    <p className="views-count">{views} views</p>
                                    <p className="ago">7 days ago</p>
                                </div>
                            </div>
                        </div>
                        {
                            action && (
                                <div className="video-action-button-container">
                                    <Link to={"/admin/video/edit/" + videoId} className="edit-icon-link">
                                        <FaEdit className="edit-icon"/>
                                    </Link>
                                    <AiFillDelete className="delete-icon text-danger action-button" onClick={event => deleteVideo(videoId)} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
