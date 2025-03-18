import { useState } from "react"
import { useAuth } from "../../AuthContext";
import { api_update } from "../../api";

import Styles from "../styles/styles";

function ProfileDetails(props) {
    const { user } = useAuth();

    const [userDetails, setUserDetails] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
    })

    const handleChange = (e) => {
        setUserDetails({...userDetails, [e.target.name]: e.target.value}); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api_update(userDetails);
            const newData = response.data;

            setUserDetails({
                first_name: newData.first_name,
                last_name: newData.last_name,
                email: newData.email,
                phone: newData.phone,
                address: newData.address,
            });
            alert("Update successful", response.data);
        } catch (error) {
            alert("Update failed", error.response?.data || error.message);
        }
    }

    return (
        <div>
            <div className='modal fade' id="profEditForm" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby='profileForm' tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Edit Account Details</h5>
                            <button className='btn-close' 
                            type="button" aria-label='close' data-bs-dismiss="modal">
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row g-2">
                                    <div className="col-md-6 position-relative">
                                        <i className="bi bi-person-fill" style={Styles.icons}></i>
                                        <input type="text" className="form-control py-2" style={{padding: "0 28px"}} id='firstName' placeholder="Enter First Name" name="first_name" value={userDetails.first_name} onChange={handleChange}/>
                                    </div>

                                    <div className="col-md-6 position-relative">
                                        <i className="bi bi-person-fill" style={Styles.icons}></i>
                                        <input type="text" className="form-control py-2" style={{padding: "0 28px"}} id='lastName' placeholder="Enter Last Name" name="last_name" value={userDetails.last_name} onChange={handleChange}/>
                                    </div>

                                    <div className="position-relative col-md-6">
                                        <i className="bi bi-envelope-fill" style={Styles.icons}></i>
                                        <input type="email" className="form-control py-2" style={{padding: "0 28px"}} id='email' placeholder="example@gmail.com" name="email" value={userDetails.email} onChange={handleChange}/>
                                    </div>

                                    <div className="position-relative col-md-6">
                                        <i className="bi bi-telephone-fill" style={Styles.icons}></i>
                                        <input type="telephone" className="form-control py-2" style={{padding: "0 28px"}} id='phone' placeholder="6##-##-##-##" name="phone" value={userDetails.phone} onChange={handleChange}/>
                                    </div>

                                    <div className="position-relative col-12">
                                        <i className="bi bi-geo-alt-fill" style={Styles.icons}></i>
                                        <input type="text" className="form-control py-2" style={{padding: "0 28px"}} id='address' placeholder="Santa Barbara, Bonamoussadi" name="address" value={userDetails.address} onChange={handleChange}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" type="button" onClick={handleSubmit}><i className='bi bi'></i>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container d-flex justify-content-center align-content-center">

                <div className="card shadow border-0 my-3 w-75" style={Styles.card}>
                    <div className="card-body">
                        <p className='text-end'>
                            <i className='bi bi-pencil-square' title="Edit" type="button" data-bs-target="#profEditForm" data-bs-toggle="modal"></i>
                        </p>
                        <div className="row row-cols-1 row-cols-md-2 mx-auto gap-2 justify-content-center">
                            <div className="col align-self-center fw-bolder fs-1 shadow-sm" style={Styles.avater}>FT</div>
                            <div className="col ">
                                <h5 className='fw-bold fs-3'>{user.first_name} {user.last_name}</h5>
                                <div>
                                    <i className='bi bi-envelope me-2' title="email"></i><p className='d-inline-block'>{user.email}</p>
                                </div>
                                <div>
                                    <i className='bi bi-telephone me-2' title="telephone"></i><p className='d-inline-block'>{user.phone}</p>
                                </div>
                                <div>
                                    <i className='bi bi-geo-alt-fill me-2' title="address"></i><p className='d-inline-block'>{user.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    );
}

export default ProfileDetails;