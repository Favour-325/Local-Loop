import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api_requestList } from "../../api";

function Requests(props) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await api_requestList();
                setRequests(response?.data);
                console.log(requests);
            } catch (error) {
                alert('An error occurred while fetching requests', error.response?.data || error.message);
            }
        })();
    }, []);

    const stateColorMap = {
        "Pending": "secondary",
        "Reviewed": "primary",
    };

    return (
        <div>
            <h3 className="lead fw-bold">My Requests</h3>

            <div className="container mt-4 px-0">
                <ul className="list-group list-group-flush">

                    {requests.map((request) => (
                        <li key={request.id} className="list-group-item px-0">
                            <div className="d-flex px-0 justify-content-between">
                                <div className="col-auto d-flex flex-column">
                                    <div className="col">
                                        <span className="fw-bold me-3" style={{color: "#23486A"}}>{request.title}</span>
                                        <span className={`badge rounded-pill text-bg-${stateColorMap[request.status] || "secondary"}`}><small>{request.status}</small></span>
                                    </div>
                                    <div className="col text-secondary">
                                        <small>{request.created_at}</small>
                                    </div>
                                </div>
                                <div className="col-auto align-self-center">
                                    <i className="bi bi-three-dots-vertical ms-2 fs-4" data-bs-toggle="dropdown"></i>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item" to="/project">Edit</Link></li>
                                        <li><Link className="dropdown-item" to="/project">Cancel</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
}

export default Requests;