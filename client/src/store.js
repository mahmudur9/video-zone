import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import {
    userLoginReducer,
    userRegisterReducer,
    userAuthenticationReducer,
    userListReducer,
    userGetReducer,
    userUpdateReducer,
    userDeleteReducer
} from './reducers/userReducers';
import page from './reducers/pageReducer';
import {
    videoListReducer,
    videoGetReducer,
    videoAddReducer,
    videoUpdateReducer,
    videoDeleteReducer,
    likeReducer,
    dislikeReducer,
    commentAddReducer,
    commentUpdateReducer,
    commentDeleteReducer,
    viewCountReducer
} from './reducers/videoReducers';
import {
    categoryListReducer,
    categoryGetReducer,
    categoryAddReducer,
    categoryUpdateReducer,
    categoryDeleteReducer
} from './reducers/categoryReducers';

const allReducers = combineReducers({
    page: page,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userAuthentication: userAuthenticationReducer,
    userList: userListReducer,
    userGet: userGetReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    videoList: videoListReducer,
    videoGet: videoGetReducer,
    videoAdd: videoAddReducer,
    videoUpdate: videoUpdateReducer,
    videoDelete: videoDeleteReducer,
    like: likeReducer,
    dislike: dislikeReducer,
    commentAdd: commentAddReducer,
    commentUpdate: commentUpdateReducer,
    commentDelete: commentDeleteReducer,
    viewCount: viewCountReducer,
    categoryList: categoryListReducer,
    categoryGet: categoryGetReducer,
    categoryAdd: categoryAddReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDelete: categoryDeleteReducer
});

const composeEnhancer = compose;

const store = createStore(
    allReducers,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
