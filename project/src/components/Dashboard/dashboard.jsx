import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, Typography, Button, Avatar, CircularProgress, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { findUserById } from '../../Store/Auth/Action';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);
    
    useEffect(() => {
        if (auth.user?.id) {
            dispatch(findUserById(auth.user.id)).finally(() => setLoading(false));
        }
    }, [dispatch, auth.user]);

    const handleNavigateProfile = () => {
        navigate(`/profile/${auth.user.id}`);
    };

    const handleNavigateToMessages = () => {
        navigate(`/messages`);
    };

    const handleNavigateToNotifications = () => {
        navigate(`/notifications`);
    };

    const handleNavigateToAnalytics = () => {
        navigate(`/analytics`);
    };

    const handleNavigateToSettings = () => {
        navigate(`/settings`);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Welcome, {auth.user?.fullName || 'User'}
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {/* Profile Overview */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ padding: 3, textAlign: 'center' }}>
                            <Avatar
                                alt="Profile Picture"
                                src={auth.user?.image}
                                sx={{ width: 120, height: 120, margin: '0 auto' }}
                            />
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                {auth.user?.fullName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                @{auth.user?.fullName?.split(' ').join('_').toLowerCase()}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ marginTop: 2 }}
                                onClick={handleNavigateProfile}
                            >
                                View Profile
                            </Button>
                        </Card>
                    </Grid>

                    {/* Statistics Section */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ padding: 3 }}>
                            <Typography variant="h6">User Statistics</Typography>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">
                                        Followers
                                    </Typography>
                                    <Typography variant="h5">{auth.user?.followers?.length || 0}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">
                                        Following
                                    </Typography>
                                    <Typography variant="h5">{auth.user?.following?.length || 0}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    {/* Notifications & Messages */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ padding: 3 }}>
                            <Typography variant="h6">Quick Actions</Typography>
                            <Divider sx={{ marginTop: 2 }} />
                            <List sx={{ paddingTop: 2 }}>
                                <ListItem button onClick={handleNavigateToNotifications}>
                                    <NotificationsIcon sx={{ marginRight: 1 }} />
                                    <ListItemText primary="Notifications" />
                                </ListItem>
                                <ListItem button onClick={handleNavigateToMessages}>
                                    <MessageIcon sx={{ marginRight: 1 }} />
                                    <ListItemText primary="Messages" />
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>

                    {/* Analytics Section */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ padding: 3 }}>
                            <Typography variant="h6">Analytics</Typography>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <Grid item xs={12}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={handleNavigateToAnalytics}
                                        startIcon={<AnalyticsIcon />}
                                    >
                                        View Analytics
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    {/* Settings Section */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ padding: 3 }}>
                            <Typography variant="h6">Account Settings</Typography>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <Grid item xs={12}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={handleNavigateToSettings}
                                        startIcon={<SettingsIcon />}
                                    >
                                        Manage Settings
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Dashboard;
