import './Home.scss';
import React from 'react';
import Keys from "../../../Keys";
import VideoWidget from "../../../widgets/video-widget/VideoWidget";
import {useState, useEffect} from 'react';
import Navbar from "../navbar/Navbar";
import VideoCard from "../../../widgets/video-card/VideoCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import Toast from "../../../widgets/toast/Toast";

import ThumbnailImage from '../../../assets/images/avatar.jpg';
import {videoListAction} from "../../../actions/videoActions";

const Home = () => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        dispatch(videoListAction());
    }, []);
    const {videoInfo, error} = useSelector(state => state.videoList);
    const showVideos = () => {
        if (videoInfo) {
            setItems(videoInfo);
            // console.log(videoInfo);
        }
        if (error) {
            Toast.dangerToast(error);
        }
    };
    useEffect(() => {
        showVideos();
    }, [videoInfo]);

    /*const fetchMoreData = () => {
        setLimit(limit + 5);
        let temp = [];
        setTimeout(() => {
            for (let i = 0; i < limit; i++){
                temp.push(videoData[i]);
            }
            setItems([...temp]);
        }, 1500);
    };

    useEffect(() => {
        fetchMoreData();
    }, []);*/

    const searchHandler = (value) => {
        setSearch(value);
    };

    // search
    useEffect(() => {
        let row = [];
        if (items.length !== 0) {
            items.filter((val) => {
                if (search === "" || search == null) {
                    row.push(val);
                    setFilter(row);
                } else if (val.title.toLowerCase().includes(search.toLowerCase()) || val.description.toLowerCase().includes(search.toLowerCase()) ||
                    val.videoCategory.categoryName.toLowerCase().includes(search.toLowerCase())) {
                    row.push(val);
                    setFilter(row);
                }
                return val;
            });
        }
    }, [search, items]);

    return (
        <div className="main-home-container">
            <Navbar searchHandler={searchHandler}/>
           <div className="home-container">
               <div className="container">
                   <div className="row">
                       <div className="col">
                           <div className="video-list-container">
                               <div className="row">
                                   {/*<InfiniteScroll
                                       dataLength={items.length}
                                       next={fetchMoreData}
                                       hasMore={true}
                                       loader={<h4>Loading...</h4>}
                                       className=""
                                   >
                                       {
                                           items.map((item, i) => (
                                               <div className="col-md-3 mb-4" key={i}>
                                                   <VideoCard />
                                               </div>
                                           ))
                                       }
                                   </InfiniteScroll>*/}
                                   {
                                       (videoInfo && filter.length > 0) && (
                                           filter.map((item, i) => (
                                               <div className="col-md-4 col-lg-3 col-sm-6 mb-4" key={i}>
                                                   {/*<Link to={"/video/" + item.videoId}>
                                                       <VideoCard
                                                           title={item.title}
                                                           owner={item.postedBy}
                                                           views={item.viewCounts}
                                                           videoId={item.videoId}
                                                           thumbnail={item.thumbnailUrl}/>
                                                   </Link>*/}
                                                   <VideoCard
                                                       title={item.title}
                                                       owner={item.postedBy}
                                                       views={item.viewCounts}
                                                       videoId={item.videoId}
                                                       thumbnail={item.thumbnailUrl}/>
                                               </div>
                                           ))
                                       )
                                   }
                               </div>
                           </div>
                       </div>
                   </div>
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

export default Home;
