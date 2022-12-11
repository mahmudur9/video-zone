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

export const videoListReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_LIST_REQUEST:
            return {loading: true};
        case VIDEO_LIST_SUCCESS:
            return {loading: false, videoInfo: action.payload};
        case VIDEO_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const videoGetReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_GET_REQUEST:
            return {loading: true};
        case VIDEO_GET_SUCCESS:
            return {loading: false, videoInfo: action.payload};
        case VIDEO_GET_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_GET_RESET:
            return {};
        default:
            return state;
    }
};

export const videoAddReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_ADD_REQUEST:
            return {loading: true};
        case VIDEO_ADD_SUCCESS:
            return {loading: false, videoInfo: action.payload};
        case VIDEO_ADD_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_ADD_RESET:
            return {};
        default:
            return state;
    }
};

export const videoUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_UPDATE_REQUEST:
            return {loading: true};
        case VIDEO_UPDATE_SUCCESS:
            return {loading: false, videoInfo: action.payload};
        case VIDEO_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const videoDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_DELETE_REQUEST:
            return {loading: true};
        case VIDEO_DELETE_SUCCESS:
            return {loading: false, videoInfo: action.payload};
        case VIDEO_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const likeReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_LIKE_REQUEST:
            return {loading: true};
        case VIDEO_LIKE_SUCCESS:
            return {loading: false, likeInfo: action.payload};
        case VIDEO_LIKE_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_LIKE_RESET:
            return {};
        default:
            return state;
    }
};

export const dislikeReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_DISLIKE_REQUEST:
            return {loading: true};
        case VIDEO_DISLIKE_SUCCESS:
            return {loading: false, dislikeInfo: action.payload};
        case VIDEO_DISLIKE_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_DISLIKE_RESET:
            return {};
        default:
            return state;
    }
};

export const commentAddReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_COMMENT_REQUEST:
            return {loading: true};
        case VIDEO_COMMENT_SUCCESS:
            return {loading: false, commentInfo: action.payload};
        case VIDEO_COMMENT_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_COMMENT_RESET:
            return {};
        default:
            return state;
    }
};

export const viewCountReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_VIEW_COUNT_REQUEST:
            return {loading: true};
        case VIDEO_VIEW_COUNT_SUCCESS:
            return {loading: false, commentInfo: action.payload};
        case VIDEO_VIEW_COUNT_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_VIEW_COUNT_RESET:
            return {};
        default:
            return state;
    }
};

export const commentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_COMMENT_UPDATE_REQUEST:
            return {loading: true};
        case VIDEO_COMMENT_UPDATE_SUCCESS:
            return {loading: false, commentInfo: action.payload};
        case VIDEO_COMMENT_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_COMMENT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const commentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_COMMENT_DELETE_REQUEST:
            return {loading: true};
        case VIDEO_COMMENT_DELETE_SUCCESS:
            return {loading: false, commentInfo: action.payload};
        case VIDEO_COMMENT_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case VIDEO_COMMENT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
