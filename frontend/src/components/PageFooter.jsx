import { Road, Sustain } from "../assets/icons";

function PageFooter() {

    const styles = {
        iconContainer: {
            width: '50px',
            height: '50px',
            backgroundColor: 'blue',
            borderRadius: '100%'
        }
    }

    return (
        <div>
            <div className="container-fluid mt-3" style={{backgroundColor: "#3B6790"}}>
                <div className="container text-light py-5">
                    <h1 className="">Connect with Your City Council</h1>
                    <p className="mb-5" style={{color: "lightgray"}}>Have questions or feedback? Reach out to us. We&apos;re here to listen and assist with any inquiries you may have.</p>
                    <div className="row row-cols-1 row-cols-md-auto justify-content-between">
                        <div className="col d-flex">
                            <div className="text-center align-content-center me-2" style={styles.iconContainer}>
                                <i className="bi bi-clock-fill" style={{ fontSize: '22px' }}></i>
                            </div>
                            <div>
                                <h6>Office Hours</h6>
                                <p className="fw-light">
                                    Monday-Friday 08:00 am to 05:00 pm
                                </p>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <div className="text-center align-content-center me-2" style={styles.iconContainer}>
                                <i className="bi bi-geo-alt-fill" style={{ fontSize: '22px' }}></i>
                            </div>
                            <div>
                                <h6>Our Address</h6>
                                <p className="fw-light">
                                    Rue Njoh-Njoh, Bonapriso
                                </p>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <div className="text-center align-content-center me-2" style={styles.iconContainer}>
                                <i className="bi bi-telephone-fill" style={{ fontSize: '22px' }}></i>
                            </div>
                            <div>
                                <h6>Contact Us</h6>
                                <p className="fw-light">+237 654-32-34-22</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid" style={{backgroundColor: "#B3C8CF"}}>
                <div className="container py-5">
                    <div className="d-flex justify-content-between fw-semibold py-5 ">
                        <div className="row row-cols-12">
                            <span className="col">
                                Development
                            </span>
                            <span className="col">
                                Community
                            </span>
                            <span className="col">
                                Growth
                            </span>
                        </div>
                        <div className="row">
                            <span className="col">
                                <a href="" className="text-dark">
                                    <i className="bi bi-facebook" style={{ fontSize: '20px' }}></i>
                                </a>
                            </span>
                            <span className="col">
                                <a href="" className="text-dark">
                                    <i className="bi bi-twitter-x" style={{ fontSize: '20px' }}></i>
                                </a>
                            </span>
                            <span className="col">
                                <a href="" className="text-dark">
                                    <i className="bi bi-linkedin" style={{ fontSize: '20px' }}></i>
                                </a>
                            </span>
                        </div>
                    </div>
                    <p className="text-center text-secondary pb-5">
                        &copy; LocalLoop 2025, All Rights Reserved. Stay Informed and Engaged with your City.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PageFooter;