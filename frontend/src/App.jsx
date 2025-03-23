import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

//import { AuthProvider } from '../AuthContext';
import ProtectedRoute from './components/ProtectedRoute1';

import { Login, SignUp, Home, Projects, Services, Profile, About } from './pages';

import ProjectViewer from './components/Project';
import ProfileDetails from './components/profile';
import Contributions from './components/contributions';
import Requests from './components/requests';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path="/logout" element={<Logout />} />

          <Route path='/home' element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>

          <Route path='/projects' element={
            <ProtectedRoute>
              <Projects/>
            </ProtectedRoute>
          }/>

          <Route path='/project' element={
            <ProtectedRoute>
              <ProjectViewer/>
            </ProtectedRoute>
          }/>

          <Route path='/services' element={
            <ProtectedRoute>
              <Services/>
            </ProtectedRoute>
          }/>

          <Route path='/account' element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }>
            <Route index element={<ProfileDetails />}/>
            <Route path='activities/contributions' element={<Contributions />}/>
            <Route path='activities/requests' element={<Requests />}/>
          </Route>

          <Route 
          path='/about'
          element={
            <ProtectedRoute>
              <About/>
            </ProtectedRoute>
          }
          />
        </Routes>
    </BrowserRouter>
  )
}

export default App
