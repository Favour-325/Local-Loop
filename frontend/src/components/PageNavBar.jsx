import logo from '../assets/pictures/logo1.png';

function PageNavBar() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg border-bottom border-body">
                <div className="container d-lg-flex justify-content-lg-between">
                    <span className="col-lg-3 p-0">
                        <a href="/home" className="navbar-brand lead fw-bold fs-4 text-secondary">
                            <img src={logo} alt="" width={37} height={30}/>LocalLoop
                        </a>
                    </span>

                    <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-controls="navbarNav" aria-label="Toggle navigation">
                        <i className="bi bi-three-dots"></i>
                    </button>

                    <div className="collapse navbar-collapse col-lg-9 align-self-lg-end d-lg-flex justify-content-lg-between" id="navbarNav">

                        <ul className="navbar-nav navbar row gap-5">
                            <div className="col d-lg-flex">
                                <li className="nav-item">
                                    <a href="/home" className="nav-link" aria-current="page">
                                        <i className="bi bi-house-fill me-1"></i>Home
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="/services" className="nav-link" aria-current="page">
                                        <i className="bi bi-microsoft me-1"></i>Services
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="/projects" className="nav-link" aria-current="page">
                                        <i className="bi bi-cone-striped me-1"></i>Projects
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="/about" className="nav-link">
                                        <i className="bi bi-info-circle-fill me-1"></i>About
                                    </a>
                                </li>
                            </div>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="/account" className="nav-link">
                                    <button className="btn text-secondary border">
                                        <i className="bi bi-person me-1"></i>Account
                                    </button>
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default PageNavBar;