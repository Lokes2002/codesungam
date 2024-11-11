import React, { useEffect } from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowers, getFollowing } from '../../Store/Auth/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';

const Member = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useSelector(store => store);
    const [tabValue, setTabValue] = React.useState('1');
    const [openModal, setOpenModal] = React.useState(true); // Open modal by default

    useEffect(() => {
        dispatch(getFollowers(id));
        dispatch(getFollowing(id));
    }, [dispatch, id]);

    const handleBack = () => navigate(-1);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleClose = () => {
        setOpenModal(false); // Close modal
    };

    return (
        <Dialog open={openModal} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <section className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95">
                    <Button onClick={handleBack}>Back</Button>
                    <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Followers & Following</h1>
                </section>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="Followers & Following Tabs">
                                <Tab label="Following" value="1" />
                                <Tab label="Followers" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box p={3}>
                                <h2>Following</h2>
                                <ul className="space-y-2">
                                    {auth.following.map(following => (
                                        <li key={following.id} className="flex items-center space-x-3 p-2 border-b border-gray-200 rounded-lg">
                                            <Avatar src={following.image} sx={{ width: 40, height: 40 }} />
                                            <span className="font-semibold">{following.fullName}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">
                            <Box p={3}>
                                <h2>Followers</h2>
                                <ul className="space-y-2">
                                    {auth.followers.map(follower => (
                                        <li key={follower.id} className="flex items-center space-x-3 p-2 border-b border-gray-200 rounded-lg">
                                            <Avatar src={follower.image} sx={{ width: 40, height: 40 }} />
                                            <span className="font-semibold">{follower.fullName}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Member;
