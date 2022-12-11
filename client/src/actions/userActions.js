import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL,
    LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
} from '../constants/userConstants';
import axios from "axios";
import Keys from "../Keys";

export const loginAction = (email, password) => async (dispatch) => {
    try {
        const {data} = await axios.post(Keys.url +  Keys.users_uri + "login",{email, password});
        localStorage.setItem("videos-zone-token", data);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
        });
    }
};

export const registerAction = (user) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.post(Keys.url +  Keys.users_uri + "register",user);
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error
        });
    }
};

export const authAction = () => async (dispatch) => {
    dispatch({
        type: AUTHENTICATION_REQUEST,
        payload: {}
    });
    const token = localStorage.getItem("videos-zone-token");
    if (token) {
        try {
            const {data} = await axios.post(Keys.url +  Keys.users_uri + "authenticate", {}, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            dispatch({
                type: AUTHENTICATION_SUCCESS,
                payload: data
            });
        }
        catch (e) {
            localStorage.removeItem("videos-zone-token");
            const error = e.response && e.response.data.error
                ? e.response.data.error
                : e.message;
            dispatch({
                type: AUTHENTICATION_FAIL,
                payload: error
            });
        }
    }
    else {
        dispatch({
            type: AUTHENTICATION_FAIL,
            payload: "No token"
        });
    }
};

export const logoutAction = () => (dispatch) => {
    localStorage.removeItem("videos-zone-token");
    dispatch({
        type: LOGOUT
    });
};

export const userUpdate = (user) => async (dispatch) => {
    const token = localStorage.getItem("videos-zone-token");
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });
        const {data} = await axios.put(Keys.url +  Keys.users_uri + "update", user, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error
        });
    }
};

export const userListAction = () => async (dispatch) => {
    dispatch({
        type: USER_LIST_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.get(Keys.url +  Keys.users_uri);
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: USER_LIST_FAIL,
            payload: error
        });
    }
};

export const userGetAction = (id) => async (dispatch) => {
    dispatch({
        type: USER_GET_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.get(Keys.url +  Keys.users_uri + "get/" + id);
        dispatch({
            type: USER_GET_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: USER_GET_FAIL,
            payload: error
        });
    }
};

export const userDeleteAction = (id) => async (dispatch) => {
    dispatch({
        type: USER_DELETE_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.delete(Keys.url +  Keys.users_uri + "delete/" + id);
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error
        });
    }
};
