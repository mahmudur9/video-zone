import './AddCategory.scss';
import React from 'react';
import {ToastContainer} from "react-toastify";
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {categoryAddAction, categoryGetAction, categoryUpdateAction} from "../../../actions/categoryActions";
import {CATEGORY_ADD_RESET, CATEGORY_UPDATE_RESET} from "../../../constants/categoryConstants";
import Toast from "../../../widgets/toast/Toast";

const AddCategory = () => {
    const dispatch = useDispatch();
    const {id: eid} = useParams();
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        if (eid) {
            dispatch(categoryGetAction(eid));
        }
    }, []);
    const {categoryInfo, error, loading} = useSelector(state => state.categoryGet);
    useEffect(() => {
        if (categoryInfo) {
            setCategoryName(categoryInfo.categoryName);
        }
    }, [categoryInfo, error]);

    const submitHandler = (event) => {
        event.preventDefault();

        if (categoryName) {
            if (!eid) {
                dispatch(categoryAddAction({categoryName}));
            }
            else {
                dispatch(categoryUpdateAction({categoryName, categoryId: eid}));
            }
        }
        else {
            Toast.dangerToast("The fields can not be empty!");
        }
    };
    const {categoryInfo: categoryAddInfo, error: categoryAddError, loading: categoryAddLoading} = useSelector(state => state.categoryAdd);
    const {categoryInfo: categoryUpdateInfo, error: categoryUpdateError, loading: categoryUpdateLoading} = useSelector(state => state.categoryUpdate);
    useEffect(() => {
        if (categoryAddInfo) {
            Toast.successToast(categoryAddInfo.message);
            dispatch({type: CATEGORY_ADD_RESET});
            setCategoryName("");
        }
        if (categoryAddError) {
            Toast.dangerToast(categoryAddError);
            dispatch({type: CATEGORY_ADD_RESET});
        }
        if (categoryUpdateInfo) {
            Toast.successToast(categoryUpdateInfo.message);
            dispatch({type: CATEGORY_UPDATE_RESET});
        }
        if (categoryUpdateError) {
            Toast.dangerToast(categoryUpdateError);
        }
    }, [categoryAddInfo, categoryAddError, categoryUpdateInfo, categoryUpdateError]);

    return (
        <div className="add-category-container">
            <title>Dashboard - {eid ? "Edit": "Add"} Category</title>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <form onSubmit={submitHandler}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input value={categoryName} onChange={event => setCategoryName(event.target.value)}  type="text"
                                   placeholder="Name" className="form-control bg-dark text-white-50"/>
                        </div>
                        {
                            (categoryAddLoading || categoryUpdateLoading) && (
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

export default AddCategory;
