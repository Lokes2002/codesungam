import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchIcon from '@mui/icons-material/Search';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import ProfileModel from './ProfileModel';
import { findUserById, followUserAction } from '../../Store/Auth/Action';
import { format } from 'date-fns';
import axios from 'axios';  // Import axios for API requests
import { API_BASE_URL } from '../../config/api'; // Make sure you have the correct API base URL in the config

const Profile = () => {
    const [openProfileModel, setOpenProfileModel] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const { id } = useParams();
    const loggedInUserId = useSelector(store => store.auth.user?.id);

    const handleOpenProfileModel = () => setOpenProfileModel(true);
    const handleCloseProfileModel = () => setOpenProfileModel(false);

    const handleBack = () => navigate(-1);

    const handleFollowUser = () => {
        dispatch(followUserAction(id)).then(() => {
            dispatch(findUserById(id));
        });
    };

    useEffect(() => {
        dispatch(findUserById(id));
    }, [dispatch, id]);

    const joinedDate = auth.findUser?.joinedDate ? format(new Date(auth.findUser?.joinedDate), 'MMMM yyyy') : 'Unknown';

    const handleNavigateToFollowers = () => {
        navigate(`/followers/${id}`);
    };

    const handleNavigateToFollowing = () => {
        navigate(`/following/${id}`);
    };

    const handleMessageClick = () => {
        navigate(`/chat/${id}`);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [openSearchModal, setOpenSearchModal] = useState(false);

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/search?query=${value}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` },
                });
                setSuggestions(response.data);
                setOpenSearchModal(true);
            } catch (error) {
                console.error('Error fetching user suggestions:', error);
            }
        } else {
            setSuggestions([]);
            setOpenSearchModal(false);
        }
    };

    const handleUserClick = (userId) => {
        window.location.href = `/profile/${userId}`;
    };

    const closeSearchModal = () => {
        setOpenSearchModal(false);
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <section className="bg-black z-50 flex items-center sticky top-0 bg-opacity-95">
                <KeyboardBackspaceIcon className="cursor-pointer text-white" onClick={handleBack} />
                <h1 className="py-5 text-xl font-bold opacity-90 ml-5">{auth.findUser?.fullName}</h1>

                {/* Search bar with icon moved to the right */}
                <div className='absolute top-0 right-0 pr-3'>
                    <div className='relative flex items-center'>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="py-3 rounded-full w-full pl-12 bg-gray-100 text-black"
                        />
                        <div className='absolute top-0 right-3 pt-3'>
                            <SearchIcon className="text-gray-500" />
                        </div>
                    </div>

                    {openSearchModal && (
                        <div className="absolute z-10 bg-white border rounded shadow-lg mt-1 w-full max-h-60 overflow-y-auto" style={{ top: '100%', left: 0 }}>
    <div className="flex justify-between items-center p-2">
        <h2 className="font-bold text-lg text-black">Suggestions</h2> {/* Added text-black */}
        <CloseIcon className="cursor-pointer" onClick={closeSearchModal} />
    </div>
    <ul className="text-black"> {/* Added text-black */}
        {suggestions.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user.id)} className="cursor-pointer hover:bg-gray-200 p-2 text-sm">
                {user.fullName}
            </li>
        ))}
    </ul>
</div>

                    )}
                </div>
            </section>
            <section>
                <img className="w-full h-60 object-cover" src={auth.findUser?.backgroundImage} alt="Cover" />
            </section>
            <section className="pl-6">
                <div className="flex justify-between items-start mt-5 h-20">
                    <Avatar
                        className="transform -translate-y-24"
                        alt="Profile Picture"
                        src={auth.findUser?.image}
                        sx={{ width: "10rem", height: "10rem", border: "4px solid black" }}
                    />
                    {auth.findUser?.reqUser ? (
                        <Button onClick={handleOpenProfileModel} variant="contained" sx={{ borderRadius: "20px" }}>
                            Edit Profile
                        </Button>
                    ) : (
                        <Button onClick={handleFollowUser} variant="contained" sx={{ borderRadius: "20px" }}>
                            {auth.findUser?.followed ? "Unfollow" : "Follow"}
                        </Button>
                    )}
                </div>
                <div>
                    <div className="flex items-center">
                        <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
                        {auth.findUser?.verified && (
                            <img className="ml-2 w-4 h-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6CEBObsZa5RkI_eVLNvFbxy_SCpTHMSa3A&s" alt="Verified" />
                        )}
                    </div>
                    <h1 className="text-gray-500">@{auth.findUser?.fullName?.split(" ").join("_").toLowerCase()}</h1>
                </div>
                <div className="mt-2 space-y-3">
                    <p>{auth.findUser?.bio || 'No bio provided'}</p>
                    <div className="py-1 flex space-x-5">
                        <div className="flex items-center text-gray-500">
                            <BusinessCenterIcon />
                            <p className="ml-2">{auth.findUser?.education || 'Not Provided'}</p>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <LocationOnIcon />
                            <p className="ml-2">{auth.findUser?.location || 'Not Provided'}</p>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <CalendarMonthIcon />
                            <p className="ml-2">Joined {joinedDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-5 mt-4">
                        <div className="flex items-center space-x-1 font-semibold cursor-pointer" onClick={handleNavigateToFollowing}>
                            <span>{auth.findUser?.following?.length || 0}</span>
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div className="flex items-center space-x-1 font-semibold cursor-pointer" onClick={handleNavigateToFollowers}>
                            <span>{auth.findUser?.followers?.length || 0}</span>
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div>
                    {auth.findUser?.reqUser && (
                        <div className="flex items-center space-x-3 mt-4">
                            <Button variant="outlined" sx={{ width: '150px' }} onClick={handleMessageClick}>
                                Message
                            </Button>
                            <Button variant="outlined" sx={{ width: '150px' }} onClick={handleOpenProfileModel}>
                                Edit Profile
                            </Button>
                        </div>
                    )}
                </div>
            </section>
            <ProfileModel open={openProfileModel} handleClose={handleCloseProfileModel} />
        </div>
    );
};

export default Profile;
