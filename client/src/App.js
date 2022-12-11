import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.scss';
import React from "react";
import ReactPlayer from "react-player";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Login from "./components/user/login/Login";
import Notfound from "./components/user/notfound/Notfound";
import Home from "./components/user/home/Home";
import Dashboard from "./components/admin/Dashboard";
import Register from "./components/user/register/Register";
import Video from "./components/user/video/Video";
import UserDetails from "./components/user/user/UserDetails";
import VideoDetails from "./components/user/video/VideoDetails";

const App = () => {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" >
                        <Home/>
                    </Route>
                    <Route exact path="/admin">
                        <Redirect to="/admin/home"/>
                        <Dashboard/>
                    </Route>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route path="/video/:id" component={Video}/>
                    {/*<Route path="/forgot-password">
                        <ForgotPassword/>
                    </Route>
                    <Route path="/reset-password/:token">
                        <ResetPassword/>
                    </Route>*/}
                    <Route path="/admin/home" component={Dashboard}/>
                    <Route path="/admin/users" component={Dashboard}/>
                    <Route path="/admin/user/add" component={Dashboard}/>
                    <Route path="/admin/user/edit/:id" component={Dashboard}/>
                    <Route path="/admin/profile" component={Dashboard}/>
                    <Route path="/user/:id" component={UserDetails}/>
                    <Route path="/admin/categories" component={Dashboard}/>
                    <Route path="/admin/category/add" component={Dashboard}/>
                    <Route path="/admin/category/edit/:id" component={Dashboard}/>
                    <Route path="/admin/videos" component={Dashboard}/>
                    <Route path="/admin/video/add" component={Dashboard}/>
                    <Route path="/admin/video/edit/:id" component={Dashboard}/>
                    <Route path="/video-details/:id" component={VideoDetails}/>
                    <Route path="*" component={Notfound}/>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
