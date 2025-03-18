import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PageNavBar from './PageNavBar';
import PageFooter from './PageFooter';
import "../styles/AuthPage.css";

import pic1 from '../assets/pictures/pic1.jpg';

function ProjectViewer(props) {
    const location = useLocation();
    const [projectData, setProjectData] = useState({ title: "", content: "", date: "" });
    const date = new Date();
    const [formData, setFormData] = useState({
        contrib_type: "",
        amount: "",
        time_commit: "",
        description: "",
        pref_contact: "",
        availability: "",
        add_comments: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        
        return {
            id: params.get('id'),
            title: params.get('title')
        };
    };

    useEffect(() => {
        // Use the id to make a request to get the project details before passing to the projectData.
        setProjectData(getQueryParams());
    }, [location.search]);

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
                                </div>
                                {formData.contrib_type === "Financial" && (
                                    <div className='col-12'>
                                        <label htmlFor="amount" className='form-label'>How much will you like to contribute financially?</label>
                                        <input type="number" min={5000} step={500} className='form-control' value={formData.amount} onChange={handleChange}/>
                                    </div>
                                )}

                                {(formData.contrib_type === "Volunteering" || formData.contrib_type === "Skills") && (
                                    <div className='col-12'>
                                        <fieldset className='row'>
                                            <legend className='col-form-label'>How much time can you dedicate?</legend>
                                            <div className="col-sm-10">
                                                <div className="form-check">
                                                    <input type="radio" className='form-check-input' name='time_commit' id='once' value={formData.time_commit}/>
                                                    <label htmlFor="once" className='form-check-label'>Once</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="radio" className="form-check-input" name='time_commit' id='weekly' value={formData.time_commit}/>
                                                    <label htmlFor="weekly" className='form-check-label'>Weekly</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="radio" className="form-check-input" name='time_commit' id='monthly' value={formData.time_commit}/>
                                                    <label htmlFor="monthly" className='form-check-label'>Monthly</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="radio" className="form-check-input" name='time_commit' id='asNeeded' value={formData.time_commit}/>
                                                    <label htmlFor="asNeeded" className='form-check-label'>As Required</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                )}

                                {formData.contrib_type === "Financial" ? "" : (<div className="col-12">
                                    <label htmlFor="description" className='form-label'>Let us know how you intend to contribute to this project</label>
                                    <textarea style={{resize: 'none'}} className='form-control' name="description" id="description" maxLength={150} cols="30" rows="5" placeholder='Please provide details about your contribution' value={formData.description} onChange={handleChange}></textarea>
                                </div>)}

                                <div className="col-12">
                                    <label htmlFor="pref_contact" className="form-label">How should we contact you for follow-ups?</label>
                                    <select id="pref_contact" name="pref_contact" className='form-select' value={formData.pref_contact} onChange={handleChange}>
                                        <option value="Phone">Phone</option>
                                        <option value="Email">Email</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="add_comments" className='form-label'>Any extra information you&apos;d like us to know?</label>
                                    <textarea style={{resize: 'none'}} className='form-control' name="add_comments" id="add_comments" maxLength={150} cols="30" rows="5" placeholder='' value={formData.add_comments} onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
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
                                <h3 className='lead fw-bold fs-3'>{projectData.title}</h3>
                                <p className='fw-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, minima? Eligendi, eius, veniam soluta repudiandae debitis nisi quos minus id sit magnam ab cupiditate neque voluptate voluptatum illum dolorem sint.</p>
                                <p><strong>Location:</strong> Nouvelle-Route Bonabo</p>
                                <p><strong>Start Date:</strong> {date.toLocaleDateString('en-GB')}</p>
                                <span className="p-1 px-2 rounded-1 text-white fw-bold" style={{backgroundColor: "blue"}}>Active</span>
                                <p className="text-muted mt-3">Last updated: {date.toLocaleString()}</p>
                            </div>
                            <div className="">
                                
                                <button className="btn mb-2 btn-primary w-100" data-bs-target='#contribForm' data-bs-toggle='modal'>Contribute</button>
                            </div>
                        </div>
                        <div className="col col-md-7">
                            <img src={pic1} alt="" className='img-fluid shadow-sm rounded-3'/>
                        </div>
                    </div>
                    <p className='fw-light fs-5 lh-lg'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae ab accusantium pariatur incidunt repudiandae odio, ut officia architecto cupiditate recusandae cum, ipsam totam magni nostrum saepe autem debitis maxime. Neque.
                        Suscipit nulla accusantium quam perspiciatis commodi exercitationem, deserunt modi architecto doloremque repellendus possimus sit error blanditiis eligendi explicabo quaerat soluta dolorum. Amet consectetur illo dolore est nam pariatur corrupti repellendus!
                        Ab necessitatibus dignissimos, ipsam placeat error quo possimus incidunt mollitia qui eius consequuntur impedit atque temporibus illo dolorum saepe similique deleniti, voluptates accusantium repellendus culpa numquam nihil rerum libero. Ex.
                        Numquam nesciunt assumenda aut possimus quidem, consectetur, sit dolore dignissimos earum rerum repellendus maiores unde in expedita harum blanditiis? Aliquam odio omnis cum quis sed vitae reprehenderit, amet magnam expedita?
                        Quaerat saepe, ducimus esse blanditiis a reprehenderit eveniet! Animi harum doloremque alias, id consequuntur voluptate! Consequuntur cupiditate quisquam officia voluptatibus. Molestias veritatis doloremque incidunt laboriosam eos ab odit est odio!
                    </p>
                </div>

                <div className='container py-1'>
                    <div className="row row-cols-sm-1 row-cols-md-2">
                        <div className="col">
                            <label htmlFor="feedback" className='form-label'>
                                <h1>
                                    Tell us what You have in Mind about this Project
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