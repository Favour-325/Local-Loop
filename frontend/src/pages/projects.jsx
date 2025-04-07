import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api_projects } from '../../api';

import pic2 from '../assets/pictures/pic2.jpg';

import PageNavBar from '../components/PageNavBar';
import PageFooter from '../components/PageFooter';
import BlurHeader from '../styles/blurHeader';

function Projects(props) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await api_projects();
                setProjects(response.data);
                console.log(projects);
            } catch (error) {
                alert('An error occurred while fetching projects', error.response?.data || error.message);
            }
        }

        getProjects();
    }, []);

    const stateColorMap = {
        "Future": "secondary",
        "Ongoing": "primary",
        "Completed": "success"
    };

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

                            {projects.map((project) => {
                                return (
                                    <div key={project.id} className="col d-flex project">
                                        <div className='card'>
                                            <img src={project.image.media} alt="" className='card-img-top h-75'/>
                                            <div className="card-body">
                                                <h5 className='card-title'>
                                                    {project.title}
                                                </h5>
                                                <span className={`badge text-bg-${stateColorMap[project.status] || "secondary"} rounded-5`}>{project.status}</span>
                                                <p className='card-text fw-light' style={{fontSize: "14px"}}>
                                                    {project.brief}
                                                </p>
                                                <Link to={`/project?id=${project.id}&title=${project.title}`}>
                                                    <a className='text-decoration-none fw-light'>Read more</a>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                            
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