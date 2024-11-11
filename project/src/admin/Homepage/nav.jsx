// src/components/CustomNavbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/Auth/Action';

function CustomNavba() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/authentication');
    };

    return (
        <nav className="shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Left Section with Logo and Links */}
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-2xl font-bold hover:text-blue-600 no-underline">
                            Campus Tracker Admin
                        </Link>
                        
                    </div>

                    {/* Right Section with Logout button */}
                    <div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default CustomNavba;
