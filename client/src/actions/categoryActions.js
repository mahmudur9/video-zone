import axios from "axios";
import Keys from "../Keys";
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_RESET,
    CATEGORY_GET_REQUEST,
    CATEGORY_GET_SUCCESS,
    CATEGORY_GET_FAIL,
    CATEGORY_GET_RESET,
    CATEGORY_ADD_REQUEST,
    CATEGORY_ADD_SUCCESS,
    CATEGORY_ADD_FAIL,
    CATEGORY_ADD_RESET,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_RESET
} from "../constants/categoryConstants";

export const categoryListAction = () => async (dispatch) => {
    dispatch({
        type: CATEGORY_LIST_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.get(Keys.url +  Keys.categories_uri);
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error
        });
    }
};

export const categoryGetAction = (id) => async (dispatch) => {
    dispatch({
        type: CATEGORY_GET_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.get(Keys.url +  Keys.categories_uri + "get/" + id);
        dispatch({
            type: CATEGORY_GET_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: CATEGORY_GET_FAIL,
            payload: error
        });
    }
};

export const categoryAddAction = (category) => async (dispatch) => {
    dispatch({
        type: CATEGORY_ADD_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.post(Keys.url +  Keys.categories_uri + "add", category);
        dispatch({
            type: CATEGORY_ADD_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: CATEGORY_ADD_FAIL,
            payload: error
        });
    }
};

export const categoryUpdateAction = (category) => async (dispatch) => {
    dispatch({
        type: CATEGORY_UPDATE_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.put(Keys.url +  Keys.categories_uri + "update", category);
        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error
        });
    }
};

export const categoryDeleteAction = (id) => async (dispatch) => {
    dispatch({
        type: CATEGORY_DELETE_REQUEST,
        payload: {}
    });
    try {
        const {data} = await axios.delete(Keys.url +  Keys.categories_uri + "delete/" + id);
        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
            payload: data
        });
    }
    catch (e) {
        const error = e.response && e.response.data.error
            ? e.response.data.error
            : e.message;
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error
        });
    }
};
