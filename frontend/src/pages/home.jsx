import { React } from 'react';

import PageNavBar from '../components/PageNavBar';
import PageFooter from '../components/PageFooter';
import "../styles/AuthPage.css";

import city1 from '../assets/pictures/city1.jpg';
import road from '../assets/pictures/roads.jpg';
import { Road, Sustain, Recycle, Electricity, RoadRepair, WaterSupply } from '../assets/icons';

function Home(props) {

    const Styles = {
        homeHeader: {
            backgroundImage: `url(${city1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            height: "80vh"
        },

        overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: "0.3",
            width: "100%",
            height: "100%",
            background: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
        }, 

        content: {
            position: "absolute",
            color: "white"
        }
    }

    return (
        <body>
            <header>
                <PageNavBar/>
            </header>

            <main>

                <div className="container-fluid d-flex justify-content-center align-items-center" style={Styles.homeHeader}>
                    <div className="" style={Styles.overlay}>
                    </div>
                    <div className="container" style={Styles.content}>
                        <h1 className='display-3 fw-bold'>Welcome to LocalLoop</h1>
                        <p className='lead'>Stay Informed with the updates from your city council. Discover the ongoing projects that shape our community</p>
                        <div className='mt-5 d-lg-flex flex-sm-column flex-lg-row'>
                            <div className="col">
                                <h6 className='fw-bold fs-3'>20+</h6><span className='lead'>Ongoing Projects</span>
                            </div>
                            <div className="col my-sm-2">
                                <h6 className='fw-bold fs-3'>10+</h6><span className='lead'>Completed Projects</span>
                            </div>
                            <div className="col">
                                <h6 className='fw-bold fs-3'>100+</h6><span className='lead'>Engaged Members</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container my-4'>
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-2">
                            <div className="container">
                                <div className="row mb-3">
                                    <span className='fw-bold text-success'>Community Driven</span>
                                    <span>
                                        <p className='fw-bold display-3 my-3'>Explore Our City Initiatives</p>
                                        <p className='lead'>
                                        Learn about the key projects and initiatives that are transforming our city. Get involved and make a difference in your community.
                                        </p>
                                    </span>
                                </div>

                                <hr className="border-bottom opacity-25" />

                                <div className="row my-4">
                                    <span className='d-flex gap-2'>
                                        {<Road/>}<p className='fw-bold h5 mb-4'>Infrastructure improvements for better connectivity and safety.</p>
                                    </span>

                                    <span className='d-flex gap-2'>
                                        {<Sustain/>}<p className='fw-bold h5'>Sustainability projects to enhance green spaces and environmental health.</p>
                                    </span>
                                </div>
                                <a href="/projects">
                                    <button className="btn " style={{
                                        backgroundColor: "skyblue",
                                        color: "white"
                                        }} type="button">
                                        Discover More
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 text-center">
                            <img src={road} className='img-fluid h-auto object-fit-contain rounded shadow ' style={{ maxHeight: '500px' }}/>
                        </div>
                    </div>
                </div>

                <div className='container my-4'>
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-2">
                            <div className="container">
                                <div className="row mb-3">
                                    <span className='fw-bold text-success'>Citizen-Centric Services</span>
                                    <span>
                                        <p className='fw-bold display-3 my-3'>Discover The Services We Offer</p>
                                        <p className='lead'>
                                        The Council offers multiple services to serve as solutions to a better living. Learn about these services to enjoy the most of them.
                                        </p>
                                    </span>
                                </div>
                                <button className="btn " style={{
                                    backgroundColor: "skyblue",
                                    color: "white"
                                    }} type="button">
                                    Discover More
                                </button>

                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="row g-2 ">
                                <div className="col-6">
                                    <div className="p-3 text-success-emphasis bg-success-subtle rounded-3 shadow-inner">
                                        <Recycle className="mb-1"/>
                                        <div className='fw-bold lead'>Waste Collection</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="p-3 text-primary-emphasis bg-primary-subtle shadow-inner rounded-3">
                                        <Electricity className="mb-1"/>
                                        <div className='fw-bold lead'>Electricity Issues</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="p-3 text-primary-emphasis bg-primary-subtle shadow-inner rounded-3">
                                        <WaterSupply className="mb-1"/>
                                        <div className='fw-bold lead'>Water Supply</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="p-3 text-warning-emphasis bg-warning-subtle shadow-inner rounded-3">
                                        <RoadRepair className="mb-1"/>
                                        <div className='fw-bold lead'>Road Repairs</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <footer>
                <PageFooter/>
            </footer>
        </body>
    );
}

export default Home;