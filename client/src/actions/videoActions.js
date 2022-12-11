import {
    VIDEO_LIST_REQUEST,
    VIDEO_LIST_SUCCESS,
    VIDEO_LIST_FAIL,
    VIDEO_LIST_RESET,
    VIDEO_GET_REQUEST,
    VIDEO_GET_SUCCESS,
    VIDEO_GET_FAIL,
    VIDEO_GET_RESET,
    VIDEO_ADD_REQUEST,
    VIDEO_ADD_SUCCESS,
    VIDEO_ADD_FAIL,
    VIDEO_ADD_RESET,
    VIDEO_UPDATE_REQUEST,
    VIDEO_UPDATE_SUCCESS,
    VIDEO_UPDATE_FAIL,
    VIDEO_UPDATE_RESET,
    VIDEO_DELETE_REQUEST,
    VIDEO_DELETE_SUCCESS,
    VIDEO_DELETE_FAIL,
    VIDEO_DELETE_RESET,
    VIDEO_LIKE_REQUEST,
    VIDEO_LIKE_SUCCESS,
    VIDEO_LIKE_FAIL,
    VIDEO_LIKE_RESET,
    VIDEO_DISLIKE_REQUEST,
    VIDEO_DISLIKE_SUCCESS,
    VIDEO_DISLIKE_FAIL,
    VIDEO_DISLIKE_RESET,
    VIDEO_COMMENT_REQUEST,
    VIDEO_COMMENT_SUCCESS,
    VIDEO_COMMENT_FAIL,
    VIDEO_COMMENT_RESET,
    VIDEO_COMMENT_UPDATE_REQUEST,
    VIDEO_COMMENT_UPDATE_SUCCESS,
    VIDEO_COMMENT_UPDATE_FAIL,
    VIDEO_COMMENT_UPDATE_RESET,
    VIDEO_COMMENT_DELETE_REQUEST,
    VIDEO_COMMENT_DELETE_SUCCESS,
    VIDEO_COMMENT_DELETE_FAIL,
    VIDEO_COMMENT_DELETE_RESET,
    VIDEO_VIEW_COUNT_REQUEST,
    VIDEO_VIEW_COUNT_SUCCESS,
    VIDEO_VIEW_COUNT_FAIL,
    VIDEO_VIEW_COUNT_RESET
} from "../constants/videoConstants";
import axios from "axios";
import Keys from "../Keys";

export const videoListAction = () => async (dispatch) => {
    dispatch({
        type: VIDEO_LIST_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.get(Keys.url +  Keys.videos_uri);
        dispatch({
            type: VIDEO_LIST_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_LIST_FAIL,
            payload: error
        });
    }
};

export const videoGetAction = (id) => async (dispatch) => {
    dispatch({
        type: VIDEO_GET_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.get(Keys.url +  Keys.videos_uri + "get/" + id);
        dispatch({
            type: VIDEO_GET_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_GET_FAIL,
            payload: error
        });
    }
};

export const addVideoAction = (video) => async (dispatch) => {
    dispatch({
            type: VIDEO_ADD_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.post(Keys.url +  Keys.videos_uri + "add", video, {
            headers: {
                // Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: VIDEO_ADD_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_ADD_FAIL,
            payload: error
        });
    }
};


export const videoUpdateAction = (video) => async (dispatch) => {
    dispatch({
        type: VIDEO_UPDATE_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.put(Keys.url +  Keys.videos_uri + "update", video, {
            headers: {
                // Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: VIDEO_UPDATE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_UPDATE_FAIL,
            payload: error
        });
    }
};

export const deleteVideoAction = (id) => async (dispatch) => {
    dispatch({
        type: VIDEO_DELETE_REQUEST
    });
    try {
        const {data} = await axios.delete(Keys.url +  Keys.videos_uri + "delete/" + id, {
            headers: {
                // token
            }
        });
        dispatch({
            type: VIDEO_DELETE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_DELETE_FAIL,
            payload: error
        });
    }
};

export const likeAction = (like) => async (dispatch) => {
    dispatch({
        type: VIDEO_LIKE_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.post(Keys.url +  Keys.videos_uri + "like", like, {
            headers: {
                // Authorization: "Bearer " + token,
                // "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: VIDEO_LIKE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_LIKE_FAIL,
            payload: error
        });
    }
};

export const disLikeAction = (dislike) => async (dispatch) => {
    dispatch({
        type: VIDEO_DISLIKE_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.post(Keys.url +  Keys.videos_uri + "dislike", dislike, {
            headers: {
                // Authorization: "Bearer " + token,
                // "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: VIDEO_DISLIKE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_DISLIKE_FAIL,
            payload: error
        });
    }
};

export const commentAddAction = (comment) => async (dispatch) => {
    dispatch({
        type: VIDEO_COMMENT_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.post(Keys.url +  Keys.videos_uri + "comment", comment, {
            headers: {
                // Authorization: "Bearer " + token,
                // "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: VIDEO_COMMENT_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_COMMENT_FAIL,
            payload: error
        });
    }
};

export const commentUpdateAction = (comment) => async (dispatch) => {
    dispatch({
        type: VIDEO_COMMENT_UPDATE_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.put(Keys.url +  Keys.videos_uri + "update-comment", comment, {
            headers: {
                // Authorization: "Bearer " + token,
                // "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: VIDEO_COMMENT_UPDATE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_COMMENT_UPDATE_FAIL,
            payload: error
        });
    }
};

export const commentDeleteAction = (id) => async (dispatch) => {
    dispatch({
        type: VIDEO_COMMENT_DELETE_REQUEST
    });
    try {
        const {data} = await axios.delete(Keys.url +  Keys.videos_uri + "delete-comment/" + id, {
            headers: {
                // token
            }
        });
        dispatch({
            type: VIDEO_COMMENT_DELETE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_COMMENT_DELETE_FAIL,
            payload: error
        });
    }
};

export const viewCountAddAction = (id) => async (dispatch) => {
    dispatch({
        type: VIDEO_VIEW_COUNT_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.post(Keys.url +  Keys.videos_uri + "view/" + id);
        dispatch({
            type: VIDEO_VIEW_COUNT_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: VIDEO_VIEW_COUNT_FAIL,
            payload: error
        });
    }
};
