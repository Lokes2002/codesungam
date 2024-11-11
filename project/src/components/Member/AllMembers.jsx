import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box } from '@mui/material';
import { getAllUsers } from '../../Store/Auth/Action';

const AllMembers = () => {
    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Box sx={{ width: '100%', maxWidth: 600, backgroundColor: 'white', borderRadius: 3, p: 3, boxShadow: 3 }}>
                <h1>All Members</h1>
                {allUsers && allUsers.length > 0 ? (
                    <ul>
                        {allUsers.map((user) => (
                            <li key={user.id} className="flex items-center space-x-3 my-2">
                                <Avatar src={user.image} />
                                <span>{user.fullName}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}
            </Box>
        </Box>
    );
};

export default AllMembers;
