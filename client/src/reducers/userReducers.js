import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL,
    USER_LOGIN_RESET,
    AUTHENTICATION_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAIL,
    USER_GET_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {userInfo: action.payload};
        case USER_LOGIN_FAIL:
            return {error: action.payload};
        case USER_LOGIN_RESET:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        case USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

export const userAuthenticationReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTHENTICATION_REQUEST:
            return {loading: true};
        case AUTHENTICATION_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case AUTHENTICATION_FAIL:
            return {loading: false, error: action.payload};
        case AUTHENTICATION_RESET:
            return {};
        default:
            return state;
    }
};

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {loading: true};
        case USER_UPDATE_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {loading: true};
        case USER_DELETE_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case USER_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const userListReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {loading: true};
        case USER_LIST_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const userGetReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GET_REQUEST:
            return {loading: true};
        case USER_GET_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_GET_FAIL:
            return {loading: false, error: action.payload};
        case USER_GET_RESET:
            return {};
        default:
            return state;
    }
};
