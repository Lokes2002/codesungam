import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EventList from './components/Events/EventList';
import ClassList from './components/Classes/ClassList';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/dashboard';
import Attendance from './components/Classes/attandance';
import Event from './components/Events/event';
import Notification from './components/Notification/notification';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/event" element={<EventList />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/attendance" element={<Attendance/>} />
            <Route path="/notification" element={<Notification/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Event/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/classes" element={<ClassList />} />
        </Routes>
    );
}

export default AppRoutes;
