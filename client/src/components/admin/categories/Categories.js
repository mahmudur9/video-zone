import './Categories.scss';
import React from 'react';
import {ToastContainer} from "react-toastify";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Toast from "../../../widgets/toast/Toast";
import {pageAction} from "../../../actions/pageActions";
import {categoryDeleteAction, categoryListAction} from "../../../actions/categoryActions";
import {CATEGORY_DELETE_RESET} from "../../../constants/categoryConstants";

const Categories = () => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);

    useEffect(() => {
        dispatch(categoryListAction());
    }, []);
    const {categoryInfo, error, loading} = useSelector(state => state.categoryList);

    useEffect(() => {
        if (categoryInfo) {
            setItems(categoryInfo);
        }
        if (error) {
            Toast.dangerToast(error);
        }
    }, [categoryInfo, error]);

    const deleteHandler = (id) => {
        dispatch(categoryDeleteAction(id));
    };
    const {categoryInfo: deleteCategoryInfo, error: deleteError, loading: deleteLoading} = useSelector(state => state.categoryDelete);
    useEffect(() => {
        if (deleteCategoryInfo) {
            Toast.successToast(deleteCategoryInfo.message);
            dispatch(categoryListAction());
            dispatch({type: CATEGORY_DELETE_RESET});
        }
        if (deleteError) {
            Toast.dangerToast(deleteError);
            dispatch({type: CATEGORY_DELETE_RESET});
        }
    }, [deleteCategoryInfo, deleteError]);

    return (
        <div className="category-container">
            <title>Dashboard - Category List</title>
            <div className="row mb-1">
                <div className="col-md-4 col-sm-5 col-12 pb-1">
                    <Link id="add-client-button" to="/admin/category/add" className="btn btn-outline-success btn-sm ">Add Category</Link>
                </div>
            </div>
            <div className="table-container">
                <table className="table table-bordered table-dark">
                    <thead>
                    <tr className="">
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.length > 0 ?
                            items.map((d, i) => {
                                return (
                                    <tr key={i}>
                                        <th className="text-center align-middle" scope="row">{d.categoryName}</th>
                                        <td className="text-center align-middle">
                                            <Link to={"/admin/category/edit/" + d.categoryId} className="text-primary"><FontAwesomeIcon icon={faEdit}/></Link>
                                            <a onClick={event => deleteHandler(d.categoryId)} className="ms-2 text-danger action-button"><FontAwesomeIcon icon={faTrash}/></a>
                                        </td>
                                    </tr>
                                )
                            }) : null
                    }
                    </tbody>
                </table>
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

export default Categories;
