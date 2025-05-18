import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api_contribList } from "../../api";

function Contributions(props) {

    const [contributions, setContributions] = useState([]);
    
        useEffect(() => {
            (async () => {
                try {
                    const response = await api_contribList();
                    setContributions(response?.data);
                    console.log(contributions);
                } catch (error) {
                    alert('An error occurred while fetching contributions', error.response?.data || error.message);
                }
            })();
        }, []);

    const stateColorMap = {
        "Pending": "secondary",
        "Reviewed": "primary",
    };

    return (
        <div>
            <h3 className="lead fw-bold">My Contributions</h3>

            <div className="container mt-4 px-0">
                {contributions.length === 0 ? (
                    <p>You haven&apos;t made any contributions yet</p>
                ) : contributions.map((contribution) => (
                    <ul key={contribution.id} className="list-group list-group-flush">
                        <li  className="list-group-item px-0">
                            <div className="d-flex px-0 justify-content-between">
                                <div className="col-auto d-flex flex-column">
                                    <div className="col">
                                        <span className="fw-bold me-3" style={{color: "#23486A"}}>{contribution.title}</span>
                                        <span className={`badge rounded-pill text-bg-${stateColorMap[contribution.status] || "secondary"}`}><small>{contribution.status}</small></span>
                                    </div>
                                    <div className="col text-secondary">
                                        <small>{contribution.contrib_type}</small> - <small>{contribution.created_at}</small>
                                    </div>
                                </div>
                                <div className="col-auto align-self-center">
                                    <Link className="text-decoration-none" to={`/project?id=${contribution.project_id}&title=${contribution.title}`}>
                                        <button className="btn border d-sm-none d-md-inline-block">View Project</button>
                                    </Link>
                                    <i className="bi bi-three-dots-vertical ms-2 fs-4 " data-bs-toggle="dropdown"></i>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        {/* <li><Link className="dropdown-item d-lg-none" to="/project">Details</Link></li>
                                        <li><Link className="dropdown-item" to="/project">Edit Contribution</Link></li> */}
                                        <li><Link className="dropdown-item d-lg-none" to={`/project?id=${contribution.project_id}&title=${contribution.title}`}>View Project</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default Contributions;