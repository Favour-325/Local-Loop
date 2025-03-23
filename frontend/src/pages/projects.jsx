import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api_projects } from '../../api';
import axios from 'axios';

import pic2 from '../assets/pictures/pic2.jpg';
import pic1 from '../assets/pictures/pic1.jpg';
import pic3 from '../assets/pictures/pic3.jpg';

import PageNavBar from '../components/PageNavBar';
import PageFooter from '../components/PageFooter';
import BlurHeader from '../styles/blurHeader';
import { Arrow } from '../assets/icons';

function Projects(props) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('access');
                const response = await axios.get('http://127.0.0.1:8000/api/projects/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjects(response.data);
                console.log(projects);
            } catch (error) {
                alert('An error occurred while fetching projects', error.response?.data || error.message);
            }
        }

        getProjects();
    }, []);

    return (
        <body>

            <header>
                <PageNavBar />
            </header>

            <main>
                <BlurHeader image={pic2} title={'City Projects'} />

                <div className="container">
                    <div className="row pb-4">
                        <div className="col display-4">
                            Discover Our City Projects
                        </div>
                        <div className="col align-self-center lead">
                            Explore the ongoing and upcoming projects shaping the future of our community.
                        </div>
                    </div>
                    <hr className='opacity-1 pb-2'/>
                </div>
                
                <section className="container">
                    <div className='pb-1' id="ongoingProjects">
                        <div className="g-2 row row-cols-2 row-cols-lg-3 row-cols-md-2">

                            <div className="col d-flex project">
                                <div className='card'>
                                    <img src={pic2} alt="" className='card-img-top'/>
                                    <div className="card-body">
                                        <h5 className='card-title'>
                                            Project Title
                                        </h5>
                                        <p className='card-text'>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores autem et ullam
                                        </p>
                                        <Link to={"/project?id=1&title=Project Title"}>
                                            <a className='text-decoration-none fw-light' href="">Read more</a>
                                        </Link>
                                    </div>

                                </div>
                            </div>

                            <div className="col d-flex project">
                                <div className='card'>
                                    <img src={pic1} alt="" className='card-img-top'/>
                                    <div className="card-body">
                                        <h5 className='card-title'>
                                            Project Title
                                        </h5>
                                        <p className='card-text'>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores autem et ullam
                                        </p>
                                        <Link to={"/project?id=1&title=Project Title"}>
                                            <a className='text-decoration-none fw-light' href="">Read more</a>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                            
                            <div className="col d-flex project">
                                <div className='card'>
                                    <img src={pic1} alt="" className='card-img-top'/>
                                    <div className="card-body">
                                        <h5 className='card-title'>
                                            Project Title
                                        </h5>
                                        <p className='card-text'>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores autem et ullam
                                        </p>
                                        <Link to={"/project?id=1&title=Project Title"}>
                                            <a className='text-decoration-none fw-light' href="">Read more</a>
                                        </Link>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </section>
            </main>

            <footer>
                <PageFooter />
            </footer>
        </body>
    );
}

export default Projects;