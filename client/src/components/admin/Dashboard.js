import "./css/sb-admin.css";
import "./Dashboard.scss";
import React, {lazy} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {} from '@fortawesome/free-brands-svg-icons';
import {} from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Profile from "../user/user/Profile";
import Videos from "./videos/Videos";
import AddVideo from "./videos/AddVideo";
import Categories from "./categories/Categories";
import AddCategory from "./categories/AddCategory";


// lazy(() => import());


// img

const Dashboard = () => {
    return (
        <div className="sb-nav-fixed">
            <div>
                <Header/>
                <div id="layoutSidenav">
                    <Sidebar/>
                    <div id="layoutSidenav_content" className="bg-dark" style={{color: "#a3a7b8"}}>
                        <main className="main-container">
                            <div className="container-fluid px-4">
                                <Route path="/admin/home" component={DashboardHome}/>
                                {/*<Route path="/admin/users" component={Users}/>*/}
                                <Route path="/admin/profile" component={Profile}/>
                                {/*<Route path="/admin/user/add" component={AddUser}/>*/}
                                {/*<Route path="/admin/user/edit/:id" component={AddUser}/>*/}
                                <Route path={"/admin/categories"} component={Categories}/>
                                <Route path={"/admin/category/add"} component={AddCategory}/>
                                <Route path={"/admin/category/edit/:id"} component={AddCategory}/>
                                <Route path={"/admin/videos"} component={Videos}/>
                                <Route path="/admin/video/add" component={AddVideo}/>
                                <Route path="/admin/video/edit/:id" component={AddVideo}/>
                            </div>
                        </main>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
