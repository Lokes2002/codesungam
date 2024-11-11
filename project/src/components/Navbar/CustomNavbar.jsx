import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Auth/Action';
import { useTheme } from '../../ThemeContext/ThemeContext';

function CustomNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Retrieve user information from Redux store
    const user = useSelector((state) => state.auth.user);
    const userId = user?.id || 16;
    const userName = user?.fullName || "User";  // Use fullName for displaying user name
    const userImage = user?.image || 'default-avatar.jpg';  // Use user image or fallback to a default image

    const handleLogout = () => {
        dispatch(logout());
        navigate('/authentication');
    };

    const handleProfile = () => {
        navigate(`/profile/${userId}`);
    };

    return (
        <nav className="shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Left Section with Logo and Links */}
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-2xl font-bold hover:text-blue-600 no-underline">
                            Campus Tracker
                        </Link>
                        <div className="hidden lg:flex space-x-6">
                            <Link to="/" className="hover:text-blue-600 transition duration-300 no-underline">Home</Link>
                            <Link to="/dashboard" className="hover:text-blue-600 transition duration-300 no-underline">Dashboard</Link>
                            <Link to="/members" className="hover:text-blue-600 transition duration-300 no-underline">Member</Link>
                            <Link to="/assignment" className="hover:text-blue-600 transition duration-300 no-underline">Assignment</Link>
                            <Link to="/notification" className="hover:text-blue-600 transition duration-300 no-underline">Notification</Link>
                        </div>
                    </div>

                    {/* Right Section with User's Name and Avatar */}
                    <div className="flex items-center space-x-4 relative">
                        <span
                            className="text-lg font-medium"
                            style={{ color: '#fff' }}  // User name in white
                        >
                            {userName}
                        </span>
                        <button
                            className="flex items-center focus:outline-none"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img
                                src={userImage}  // Use user's image or default avatar
                                alt="Profile"
                                className="rounded-full w-10 h-10 border border-gray-300 hover:border-blue-400 transition duration-300"
                                style={{ borderRadius: '50%' }}  // Make avatar circular
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48" style={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff', zIndex: 100 }}>
                                <button
                                    onClick={handleProfile}
                                    className="block px-4 py-2 hover:bg-gray-100 transition duration-300 no-underline"
                                    style={{ color: darkMode ? '#fff' : '#000' }}
                                >
                                    Profile
                                </button>
                                <div className="border-t border-gray-200"></div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-300"
                                    style={{ color: darkMode ? '#fff' : '#000' }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white shadow-lg">
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-100 no-underline">Home</Link>
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 no-underline">Dashboard</Link>
                    <Link to="/members" className="block px-4 py-2 hover:bg-gray-100 no-underline">Member</Link>
                    <Link to="/assignment" className="block px-4 py-2 hover:bg-gray-100 no-underline">Assignment</Link>
                    <Link to="/notification" className="block px-4 py-2 hover:bg-gray-100 no-underline">Notification</Link>
                </div>
            )}
        </nav>
    );
}

export default CustomNavbar;
