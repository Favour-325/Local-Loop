import React from "react";
import { Link } from "react-router-dom";

function Contributions(props) {
    return (
        <div>
            <h3 className="lead fw-bold">My Contributions</h3>

            <div className="container mt-4 px-0">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                        <div className="d-flex px-0 justify-content-between">
                            <div className="col-auto d-flex flex-column">
                                <div className="col">
                                    <span className="fw-bold me-3">Long Project Title</span>
                                    <span className="badge rounded-pill text-bg-success"><small>Status</small></span>
                                </div>
                                <div className="col text-secondary">
                                    <small>Date</small> - <small>Request status</small>
                                </div>
                            </div>
                            <div className="col-auto align-self-center">
                                <Link className="text-decoration-none">
                                    <button className="btn border d-sm-none d-md-inline-block">View Project</button>
                                </Link>
                                <i className="bi bi-three-dots-vertical ms-2 fs-4" data-bs-toggle="dropdown"></i>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item d-lg-none" to="/project">View Project</Link></li>
                                    <li><Link className="dropdown-item" to="/project">Edit Project</Link></li>
                                    <li><Link className="dropdown-item" to="/project">Delete Project</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item px-0">
                        <div className="d-flex px-0 justify-content-between">
                            <div className="col-auto d-flex flex-column">
                                <div className="col">
                                    <span className="fw-bold me-3">Long Project Title</span>
                                    <span className="badge rounded-pill text-bg-success"><small>Status</small></span>
                                </div>
                                <div className="col text-secondary">
                                    <small>Date</small> - <small>Request status</small>
                                </div>
                            </div>
                            <div className="col-auto align-self-center">
                                <Link className="text-decoration-none">
                                    <button className="btn border d-sm-none d-md-inline-block">View Project</button>
                                </Link>
                                <i className="bi bi-three-dots-vertical ms-2 fs-4" data-bs-toggle="dropdown"></i>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item d-lg-none" to="/project">View Project</Link></li>
                                    <li><Link className="dropdown-item" to="/project">Edit Project</Link></li>
                                    <li><Link className="dropdown-item" to="/project">Delete Project</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Contributions;