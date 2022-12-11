import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faBookOpen,
    faChartArea,
    faTable,
    faTachometerAlt,
    faCog,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark card" style={{borderRadius: 0}} id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <Link className="nav-link" to="/admin/home">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTachometerAlt}/></div>
                            Dashboard
                        </Link>
                        <div className="sb-sidenav-menu-heading">Interface</div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                           data-bs-target="#collapseLayouts" aria-expanded="false"
                           aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCog}/></div>
                            Settings
                            <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown}/>
                            </div>
                        </a>
                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                             data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link" href="#">Static Navigation</a>
                                <a className="nav-link" href="#">Light Sidenav</a>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                           data-bs-target="#collapsePages" aria-expanded="false"
                           aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBookOpen}/></div>
                            Pages
                            <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown}/>
                            </div>
                        </a>
                        <div className="collapse" id="collapsePages" aria-labelledby="headingTwo"
                             data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav accordion"
                                 id="sidenavAccordionPages">
                                <Link className="nav-link" to="/admin/users">User List</Link>
                                <Link className="nav-link" to="/admin/categories">Category List</Link>
                                <Link className="nav-link" to="/admin/videos">Video List</Link>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Admin
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
