import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PageNavBar from './PageNavBar';
import PageFooter from './PageFooter';
import "../styles/AuthPage.css";

import pic1 from '../assets/pictures/pic1.jpg';
import { api_contribCreate, api_getProject, api_authenticate } from '../../api';

function ProjectViewer(props) {
    const location = useLocation();
    const [projectData, setProjectData] = useState({});
    const [formData, setFormData] = useState({
        author: null,
        project: null,
        contrib_type: "",
        amount: null,
        time_commit: "",
        description: "",
        add_comments: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const getProjectDetails = async (id) => {
        const response = await api_getProject(id);
        return response.data;
    };

    useEffect(() => {
        const projectId = new URLSearchParams(location.search).get('id');
        setFormData({...formData, project: projectId});
        if (formData.project) {
            (async () => {
                try {
                    const response = await getProjectDetails(projectId);
                    setProjectData(response);
                    const res = await api_authenticate();
                    setFormData({...formData, author: res?.data.id});
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            })();
        } else {
            console.error("Invalid Project ID");
        }
    }, [formData.project]);

    const validationTest = () => {
        const newErrors = {};

        if (!formData.contrib_type) {
            newErrors.contribType = "Please select a contribution type";
        } else if (formData.contrib_type === "Financial" && !formData.amount) {
            newErrors.amount = "Please specify your amount";
        } else if ((formData.contrib_type === "Volunteering" || formData.contrib_type === "Skills") && !formData.time_commit) {
            newErrors.timeCommit = "Please specify how much time you'll like to commit";
        } else if ((formData.contrib_type === "Volunteering" || formData.contrib_type === "Skills") && !formData.description) {
            newErrors.description = "Please provide details about your contribution";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validationTest();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            try {
                console.log(formData);
                api_contribCreate(formData);
                alert("Contribution Created Successfully!");
            } catch (error) {
                console.error("Failed to create contribution", error.response?.error || error.message);
            }
        } else {
            setErrors(validationErrors);
        }
    }

    const stateColorMap = {
        "Future": "secondary",
        "Ongoing": "primary",
        "Completed": "success"
    };

    return (
        <div>
            <div className="modal fade" id="contribForm" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby='contributionsForm' tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="">
                                <h5>Contribute to this Project</h5>
                                <p>Fill the form to make a contribution</p>
                            </div>
                            <button className='btn-close' type='button' data-bs-dismiss="modal" aria-label='close'></button>
                        </div>
                        <div className="modal-body">

                            <form id="userContribution">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="#contrib_type" className="form-label">In what way will you like to contribute?</label>
                                        <select id="contrib_type" name="contrib_type" className='form-select' value={formData.contrib_type} onChange={handleChange}>
                                            <option>Choose...</option>
                                            <option value="Financial">Financial Support</option>
                                            <option value="Volunteering">Volunteering</option>
                                            <option value="Resources">Providing Resources (e.g. Materials, Tools,..)</option>
                                            <option value="Skills">Offering Expertise/Skills</option>
                                            <option value="Other">Other (Please Specify)</option>
                                        </select>
                                        {errors.contribType && <span className="small text-danger">{errors.contribType}</span>}
                                    </div>

                                    {formData.contrib_type === "Financial" && (
                                        <div className='col-12'>
                                            <label htmlFor="amount" className='form-label'>How much will you like to contribute financially?</label>
                                            <input type="number" min={5000} step={500} className='form-control' name="amount" value={formData.amount} onChange={handleChange}/>
                                            {errors.amount && <span className="small text-danger">{errors.amount}</span>}
                                        </div>
                                    )}

                                    {(formData.contrib_type === "Volunteering" || formData.contrib_type === "Skills") && (
                                        <div className='col-12'>
                                            <fieldset className='row'>
                                                <legend className='col-form-label'>How much time can you dedicate?</legend>
                                                <div className="col-sm-10">
                                                    <div className="form-check">
                                                        <input type="radio" className='form-check-input' name='time_commit' id='once' value="Once" onChange={handleChange}/>
                                                        <label htmlFor="once" className='form-check-label'>Once</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input type="radio" className="form-check-input" name='time_commit' id='weekly' value="Weekly" onChange={handleChange}/>
                                                        <label htmlFor="weekly" className='form-check-label'>Weekly</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input type="radio" className="form-check-input" name='time_commit' id='monthly' value="Monthly" onChange={handleChange}/>
                                                        <label htmlFor="monthly" className='form-check-label'>Monthly</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input type="radio" className="form-check-input" name='time_commit' id='asNeeded' value="As Required" onChange={handleChange}/>
                                                        <label htmlFor="asNeeded" className='form-check-label'>As Required</label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            {errors.timeCommit && <span className="small text-danger">{errors.timeCommit}</span>}
                                        </div>
                                    )}

                                    {formData.contrib_type === "Financial" ? "" : (<div className="col-12">
                                        <label htmlFor="description" className='form-label'>Let us know how you intend to contribute to this project</label>
                                        <textarea style={{resize: 'none'}} className='form-control' name="description" id="description" maxLength={150} cols="30" rows="5" placeholder='Please provide details about your contribution' value={formData.description} onChange={handleChange}></textarea>
                                        {errors.description && <span className="small text-danger">{errors.description}</span>}
                                    </div>)}

                                    <div className="col-12">
                                        <textarea style={{resize: 'none'}} className='form-control' name="add_comments" id="add_comments" maxLength={150} cols="30" rows="5" placeholder='Any extra information you&apos;d like us to know?' value={formData.add_comments} onChange={handleChange}></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <header>
                <PageNavBar />
            </header>

            <main>
                <div className="container">
                    <div className="row my-3 row-cols-1 row-cols-md-2">
                        <div className="col col-md-5 d-flex flex-column justify-content-between">
                            <div>
                                <h3 className='lead fw-bold fs-3'>{projectData?.title}</h3>
                                <p className='fw-light'>{projectData?.brief}</p>
                                <p><strong>Location:</strong> {projectData?.location}</p>
                                <p><strong>Start Date:</strong> {projectData?.start_date}</p>
                                <span className={`p-1 px-2 rounded-1 text-bg-${stateColorMap[projectData?.status] || "secondary"} fw-bold`}>{projectData?.status}</span>
                                <p className="text-muted mt-3">Last updated: {projectData?.updated_at}</p>
                            </div>
                            <div className="">
                                <button className={`btn mb-2 btn-primary w-100 ${projectData?.status === "Completed" && "disabled"}`} data-bs-target='#contribForm' data-bs-toggle='modal'>Contribute</button>
                            </div>
                        </div>
                        <div className="col col-md-7">
                            <img src={projectData.image?.media || pic1} alt="Project Image" className='img-fluid shadow-sm rounded-3'/>
                        </div>
                    </div>
                    <p className='fw-light fs-5 lh-lg'>
                        {projectData.text}
                    </p>
                </div>

                <div className='container py-1'>
                    <div className="row row-cols-sm-1 row-cols-md-2">
                        <div className="col">
                            <label htmlFor="feedback" className='form-label'>
                                <h1>
                                    Tell Us What You Think About This Project
                                </h1>
                            </label>
                        </div>
                        <div className="col">
                            <textarea className='form-control' style={{resize:'none'}} name="feedback" id='feedback' maxLength={150} cols="30" rows="7" placeholder="Your Feedback here..."></textarea>
                        </div>
                    </div>
                </div>
                
            </main>

            <footer>
                <PageFooter />
            </footer>
        </div>
    );
}

export default ProjectViewer;