// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Authentication from './components/Authentication/Authentication';
import HomePage from './components/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';
import { ThemeProvider } from './ThemeContext/ThemeContext';
import Dashboard from './components/Dashboard/dashboard';
import CustomNavbar from './components/Navbar/CustomNavbar';
import Notification from './components/Notification/notification';
import Profile from './components/Profile/Profile';
import AdminPage from './admin/Homepage/AdminPage';
import Assignment from './components/Assignment/Assignment';
import Member from './components/Member/Member';
import AllMembers from './components/Member/AllMembers';

function App() {
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            dispatch(getUserProfile(jwt))
                .catch(error => {
                    console.error("Failed to get user profile:", error);
                    navigate('/login'); 
                });
        }
    }, [dispatch, jwt, navigate]);

    return (
        <ThemeProvider>
            <div className="">
            <Routes>   
                <Route  path="/*" element={ auth.user ? ( <><CustomNavbar /> <HomePage /> </> ) : (
      <Authentication /> )}/> 
                <Route path="/dashboard" element={( <><CustomNavbar /> <Dashboard/> </> )} />
                <Route path="/admin" element={(  <AdminPage/> )} />
                    <Route path="/notification" element={( <><CustomNavbar /> <Notification/> </> )} />
                    <Route path="/profile/:id" element={( <><CustomNavbar /> <Profile/> </> )} />
                    <Route path="/members" element={( <><CustomNavbar /> <Member/> </> )} />
                    <Route path="/assignment" element={( <><CustomNavbar /> <Assignment/> </> )} />
                    <Route path="/all-members" element={(<><CustomNavbar /> <AllMembers /> </>)} />
               
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
