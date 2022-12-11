import './AddVideo.scss';
import React from 'react';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import Toast from "../../../widgets/toast/Toast";
import {useSelector, useDispatch} from "react-redux";
import {addVideoAction, videoGetAction, videoUpdateAction} from "../../../actions/videoActions";
import {VIDEO_ADD_RESET, VIDEO_GET_RESET, VIDEO_UPDATE_RESET} from "../../../constants/videoConstants";
import {categoryListAction} from "../../../actions/categoryActions";

const AddVideo = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [video, setVideo] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [videoCategoryId, setVideoCategoryId] = useState("");
    const [viewCount, setViewCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const {id: eid} = useParams();

    useEffect(() => {
        dispatch(categoryListAction());
        if (eid) {
            dispatch(videoGetAction(eid));
        }
    }, []);
    const {videoInfo: getVideoInfo, error: getVideoError} = useSelector(state => state.videoGet);
    useEffect(() => {
        if (getVideoInfo) {
            setTitle(getVideoInfo.title);
            setDescription(getVideoInfo.description);
            setVideoUrl(getVideoInfo.url);
            setThumbnailUrl(getVideoInfo.thumbnailUrl);
            setVideoCategoryId(getVideoInfo.videoCategoryId);
            setViewCount(getVideoInfo.viewCounts);
            setCategory(getVideoInfo.videoCategoryId);

            console.log(getVideoInfo);

            dispatch({type: VIDEO_GET_RESET});
        }
    }, [getVideoInfo, getVideoError]);

    const {categoryInfo, error: categoryError, loading: categoryLoading} = useSelector(state => state.categoryList);
    useEffect(() => {
        if (categoryInfo) {
            setCategories(categoryInfo);
        }
        if (categoryError) {
            Toast.dangerToast(categoryError);
        }
    }, [categoryInfo, categoryError]);

    const {userInfo, error: userError, loading: userLoading} = useSelector(state => state.userAuthentication);

    const submitHandler = (e) => {
        e.preventDefault();
        if (title && description) {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("thumbnailFile", thumbnail);
            formData.append("videoFile", video);
            formData.append("postedById", userInfo.userId);
            formData.append("videoCategoryId", category);

            if (!eid) {
                if (!thumbnail || !video) {
                    Toast.dangerToast("The fields can not be empty!");
                    return;
                }
                dispatch(addVideoAction(formData));
            }
            else {
                formData.append("url", videoUrl);
                formData.append("thumbnailUrl", thumbnailUrl);
                formData.append("viewCounts", viewCount);
                formData.append("videoCategoryId", videoCategoryId);
                formData.append("videoId", eid);

                // update
                dispatch(videoUpdateAction(formData));
            }
        }
        else {
            Toast.dangerToast("The fields can not be empty!");
        }
    };
    const {videoInfo, error, loading} = useSelector(state => state.videoAdd);
    const {videoInfo: videoUpdateInfo, error: videoUpdateError, loading: videoUpdateLoading} = useSelector(state => state.videoUpdate);
    useEffect(() => {
        if (videoInfo) {
            setTitle("");
            setDescription("");
            Toast.successToast(videoInfo.message);
            dispatch({type: VIDEO_ADD_RESET});
        }
        if (error) {
            Toast.dangerToast(error);
            dispatch({type: VIDEO_ADD_RESET});
        }
        if (videoUpdateInfo) {
            Toast.successToast(videoUpdateInfo.message);
            dispatch({type: VIDEO_UPDATE_RESET});
        }
        if (videoUpdateError) {
            Toast.dangerToast(videoUpdateError);
            dispatch({type: VIDEO_UPDATE_RESET});
        }
    }, [videoInfo, error, videoUpdateInfo, videoUpdateError]);

    return (
        <div className="add-video-container">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <form onSubmit={submitHandler}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Title<span className="text-danger">*</span></label>
                            <input value={title} onChange={event => setTitle(event.target.value)}  type="text"
                                   placeholder="Name" className="form-control bg-dark text-white-50"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Description<span className="text-danger">*</span></label>
                            <input value={description} onChange={event => setDescription(event.target.value)}  type="text"
                                   placeholder="Description" className="form-control bg-dark text-white-50"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image" className="form-label">Thumbnail<span className="text-danger">*</span></label>
                            <input onChange={event => setThumbnail(event.target.files[0])} type="file" className="form-control bg-dark text-white-50"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image" className="form-label">Video File<span className="text-danger">*</span></label>
                            <input onChange={event => setVideo(event.target.files[0])} type="file" className="form-control bg-dark text-white-50"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputState" className="form-label">Service Category</label>
                            <select value={category} onChange={event => setCategory(event.target.value)} id="inputState"
                                    className="form-control col-md-4 bg-dark">
                                <option value={""}>Choose...</option>
                                {
                                    categories.length > 0 ?
                                        categories.map((d, i) => {
                                            return (
                                                <option key={i} value={d.categoryId}>{d.categoryName}</option>
                                            )
                                        })
                                        : null
                                }
                            </select>
                        </div>
                        {
                            (loading || videoUpdateLoading) && (
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                        }
                        <input type="submit" className="btn btn-outline-success form-control"
                               value={eid ? "Update": "Add"}/>
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

export default AddVideo;
