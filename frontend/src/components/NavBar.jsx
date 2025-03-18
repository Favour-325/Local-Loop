function NavBar() {
    return (
        <nav className="navbar bg-body-secondary">
            <div className="container-fluid">
                <a href="" className="navbar-brand">LocalLoop</a>
                <ul className="nav nav-underline">
                    <li className="nav-item">
                    <a href="/home" className="nav-link" aria-current="page">Home</a>
                    </li>
                    <li className="nav-item">
                    <a href="/about" className="nav-link">About</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;