import { useState, useEffect } from 'react';
import { api_requestCreate, api_authenticate } from '../../api';
import { ToastContainer, toast } from 'react-toastify';

import pic1 from '../assets/pictures/pic1.jpg';
import { Recycle, Electricity, RoadRepair, WaterSupply } from '../assets/icons';

import Layout from './layout';
import BlurHeader from '../styles/blurHeader';
import LocationSearch from '../components/LocationSearch';

function Services(props) {

    const [requestData, setRequestData] = useState({
        author: null,
        description: "",
        ref_image: null,
        council: null
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await api_authenticate();
                setRequestData({ author: response?.data.id, council: response?.data.council });
                console.log("User data:", Number(response?.data.id));
            } catch (error) {
                console.error("Error fetching user data:", error.response?.data || error.message);
            }
        })();
    }, []);

    const [selectedService, setSelectedService] = useState({});
    const [location, setLocation] = useState(null);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!requestData.description) {
            newErrors.description = "Description is required";
        } else if (requestData.description.length < 10) {
            newErrors.description = "Description is too short";
        } else if (location === null) {
            newErrors.location = "Please specify a location";
        }

        return newErrors;
    }

    // Once created, get the list of services from the database
    const services = [
        { 
            id: 1, 
            title: "Waste Management", 
            description: "This is the waste management service. Request now solutions for quality living", 
            icon: Recycle 
        },
        { 
            id: 2, 
            title: "Electricity", 
            description: "This is the electricity repair service. Request now solutions for quality living", 
            icon: Electricity 
        },
        { 
            id: 3, 
            title: "Water Supply", 
            description: "This is the water supply service. Request now solutions for quality living", 
            icon: WaterSupply 
        },
        { 
            id: 4, 
            title: "Road Repair", 
            description: "This is the road repair service. Request now solutions for quality living", 
            icon: RoadRepair 
        },
    ]

    const handleChange = (e) => {
        if (e.target.name === "ref_image") {
            setRequestData({...requestData, [e.target.name]: e.target.files[0]});
        } else {
            setRequestData({...requestData, [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});

            const formData = new FormData();
            formData.append("author", Number(requestData.author));
            formData.append("title", selectedService.title);
            formData.append("description", requestData.description);
            formData.append("ref_image", requestData.ref_image);
            formData.append("location", location.name);
            
            try {
                await api_requestCreate(formData);
                toast.success("Request Created Successfully!");
                setRequestData({ description: "", ref_image: null});
                setLocation(null);
                setSelectedService({});

            } catch (error) {
                console.log("Request rejected", error.response?.data || error.messsage);
                toast.error("Failed to create request");
            }
        } else {
            setErrors(validationErrors);
        }
    }

    const handleClose = () => {
        setRequestData({ description: "", ref_image: null, location: null });
        setSelectedService({});
        setLocation(null);
        setErrors({});
    };

    return (
        <Layout>
            <div className="modal fade" id="requestForm" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby='requestService' tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="">
                                <h5 className="modal-title display-6" id="requestService">{selectedService.title}</h5>
                            </div>
                            <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='close'></button>
                        </div>

                        <div className="modal-body">

                            <form id="userInformation">
                                <div className='g-3 row'>
                                    <h5>Request Details</h5>
                                    <p className='text-muted my-0'>Please fill in the details to help us serve you better</p>

                                    <div className="col-12">
                                        <label htmlFor="description" className='form-label'>Description of the Issue</label>
                                        <textarea style={{resize: 'none'}} className='form-control' name="description" id="description" maxLength={150} cols="30" rows="5" placeholder='Provide a brief description of the Issue' value={requestData.description} onChange={handleChange}></textarea>
                                        {errors.description && <span className="text-danger">{errors.description}</span>}
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="ref_image" className='form-label'>Reference Image</label>
                                        <input type="file" className='form-control' name="ref_image" id="ref_image" onChange={handleChange}/>
                                    </div>

                                    <div className='col-12'>
                                        <label htmlFor="location" className='form-label'>Location</label>
                                        <LocationSearch onSelectLocation={setLocation}/>
                                        {errors.location && <span className="text-danger">{errors.location}</span>}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <BlurHeader image={pic1} title={'Municipal Services'} />

                <div className="container">

                    <div className="row pb-4">
                        <div className="col display-4">
                            Solutions For Quality Living
                        </div>
                        <div className="col align-self-center lead">
                            Explore the ongoing and upcoming projects shaping the future of our community.
                        </div>
                    </div>

                    <hr className='opacity-1 pb-2'/>

                    <div className="g-4 row row-cols-1 row-cols-lg-4 row-cols-md-2">
                        {services.map((service) => {
                            const IconComponent = service.icon;
                            return (
                                <div className="col" key={service.id}>
                                    <div className="card border-success">
                                        <div className="card-body">
                                            <IconComponent/>
                                            <h5 className='card-title'>{service.title}</h5>
                                            <hr className='text-success'/>
                                            <p className="card-text">
                                                {service.description}
                                            </p>
                                            <a href="#" className="text-decoration-none icon-link icon-link-hover"
                                            role='button'
                                            data-bs-target="#requestForm" data-bs-toggle="modal"
                                            onClick={() => setSelectedService(service)}
                                            >
                                                Request Service
                                            <i className="bi bi-arrow-right" style={{ fontSize: '1rem', display: 'inline-flex', alignItems: 'center' }}></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        )})}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
        
    )
}

export default Services;