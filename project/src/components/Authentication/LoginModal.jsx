import React, { useState } from 'react';

function LoginModal() {
    // State to track user or admin login
    const [loginType, setLoginType] = useState('user'); // Default is 'user'

    const handleLoginTypeChange = (type) => {
        setLoginType(type); // Toggle between 'user' and 'admin'
    };

    const handleLoginSubmit = () => {
        if (loginType === 'user') {
            // User login logic
            console.log("User logging in...");
        } else {
            // Admin login logic
            console.log("Admin logging in...");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{loginType === 'user' ? 'User Login' : 'Admin Login'}</h2>
                
                {/* Login Form */}
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" placeholder={loginType === 'user' ? 'User Email' : 'Admin Email'} />
                    <input type="password" placeholder={loginType === 'user' ? 'User Password' : 'Admin Password'} />
                    <button type="submit">{loginType === 'user' ? 'Login as User' : 'Login as Admin'}</button>
                </form>

                {/* Toggle Button */}
                <div className="toggle-buttons">
                    <button onClick={() => handleLoginTypeChange('user')}>Login as User</button>
                    <button onClick={() => handleLoginTypeChange('admin')}>Login as Admin</button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
