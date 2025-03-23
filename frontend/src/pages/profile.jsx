import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useMatch, Outlet } from 'react-router-dom';
import { api_authenticate } from '../../api';
//import { useAuth } from '../../AuthContext';

import Layout from './layout';
//import ProfileDetails from '../components/profile';

function Profile(props) {
    //const { user } = useAuth();
    const [user, setUser] = useState("");
    const isProfileActive = useMatch('/account');
    const isActivitiesActive = useMatch('/account/activities/*');

    const getUser = async () => {
        const response = await api_authenticate();
        setUser(response.data);
        console.log("User", response.data);
    }
    
    useEffect(() => {
        getUser();
    }, [])

    const Styles = {
        dropdown: {
            padding: '7px',
            
        },

        dropdownItem: {
            color: 'gray',
            fontSize: '15px'
        },

        link: {
            fontWeight: "bold",
            borderBottom: "1px solid lightGray",
        }
    }
    
    return (
        <Layout>
            <div className="container">

                <h1 className='lead fw-bold fs-1 my-2'>Welcome {user.email} 👋,</h1>
                <div className='row my-3 gap-5 justify-content-start'>
                    <div className="col-1 fs-5">
                        <Link 
                        className='text-secondary text-decoration-none' 
                        to={"/account"}
                        style={isProfileActive && Styles.link}
                        >Profile</Link>
                    </div>

                    <div className="col-1 fs-5">
                        <a 
                        className='text-secondary text-decoration-none' 
                        style={isActivitiesActive && Styles.link}
                        type='button'
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >Activities</a>

                        <ul className='dropdown-menu' style={Styles.dropdown}>
                            <Link className="dropdown-item lead" to={"/account/activities/contributions"} style={Styles.dropdownItem}>My Contributions</Link>

                            <Link className="dropdown-item lead" to={"/account/activities/requests"} style={Styles.dropdownItem}>My Requests</Link>
                        </ul>
                    </div>
                </div>

                <hr />

                <Outlet/>

            </div>
        </Layout>
    )
}

export default Profile;