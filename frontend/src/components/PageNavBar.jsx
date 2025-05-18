import logo from '../assets/pictures/logo1.png';

function PageNavBar() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg border-bottom border-body">
                <div className="container d-lg-flex">
                    <div className="col-lg-4">
                        <a href="/home" className="navbar-brand lead fw-bold fs-4 ">
                            <img src={logo} alt="" width={37} height={30}/>LocalL<span className='text-primary'>oo</span>p
                        </a>
                    </div>

                    <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-controls="navbarNav" aria-label="Toggle navigation">
                        <i className="bi bi-three-dots"></i>
                    </button>

                    <div className="collapse navbar-collapse col-lg-auto justify-content-between d-lg-flex" id="navbarNav">
                        <div className="navbar-nav">
                            <a href="/home" className="nav-link fw-bold" aria-current="page">
                                <i className="bi bi-house-fill me-1"></i>Home
                            </a>

                            <a href="/services" className="nav-link fw-bold" aria-current="page">
                                <i className="bi bi-microsoft me-1"></i>Services
                            </a>

                            <a href="/projects" className="nav-link fw-bold" aria-current="page">
                                <i className="bi bi-cone-striped me-1"></i>Projects
                            </a>

                            <a href="/about" className="nav-link fw-bold">
                                <i className="bi bi-info-circle-fill me-1"></i>About
                            </a>
                        </div>
                        <div className="navbar-nav">
                            <a href="/account" className="nav-link">
                                <button className="btn text-secondary border">
                                    <i className="bi bi-person me-1"></i>Account
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default PageNavBar;