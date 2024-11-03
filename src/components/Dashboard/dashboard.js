import React from 'react';
import './dashboard.css'; // CSS file for styling

import { Avatar, Button, Typography, Box, Grid, Paper } from '@material-ui/core';

function Dashboard() {
    return (
        <div className="dashboard-container">
            {/* Left Section - Profile */}
            <Paper elevation={3} sx={{ width: '25%', padding: 3 }}>
                <Box display="flex" alignItems="center" flexDirection="column">
                    {/* Enlarged Avatar */}
                    <Avatar
                        src="/path-to-profile-image.jpg"
                        alt="User Avatar"
                        sx={{ width: 100, height: 100, marginBottom: 2 }} // Adjust size here
                    />
                    <Typography variant="h6">Username</Typography>
                    <Typography variant="body2" color="textSecondary">
                        @userid
                    </Typography>
                    <Button variant="outlined" sx={{ marginTop: 2 }}>Edit Profile</Button>

                    {/* Additional Profile Details */}
                    <Box mt={3} textAlign="left" width="100%">
                        <Typography variant="body1"><strong>Roll Number:</strong> 12345</Typography>
                        <Typography variant="body1"><strong>Course Name:</strong> B.Sc. Computer Science</Typography>
                        {/* Add more profile details as needed */}
                    </Box>
                </Box>
            </Paper>

            {/* Center Section - Tasks and Assignments */}
            <div className="center-section">
                <div className="tasks-box">
                    <h3>Assignments</h3>
                    <div className="task-item">
                        <h4>Math Assignment</h4>
                        <p>Due Date: 25th Nov</p>
                        <p>Status: Pending</p>
                    </div>
                    <div className="task-item">
                        <h4>Science Project</h4>
                        <p>Due Date: 30th Nov</p>
                        <p>Status: In Progress</p>
                    </div>
                </div>

                <div className="tasks-box">
                    <h3>New Tasks</h3>
                    <div className="task-item">
                        <h4>Lab Report</h4>
                        <p>Due Date: 28th Nov</p>
                        <p>Status: Not Started</p>
                    </div>
                    <div className="task-item">
                        <h4>Group Presentation</h4>
                        <p>Due Date: 1st Dec</p>
                        <p>Status: Not Started</p>
                    </div>
                </div>
            </div>

            {/* Right Section - Events and Rewards */}
            <div className="right-section">
                <div className="calendar-box">
                    <h3>Event Calendar</h3>
                    {/* Embed or use any Calendar component here */}
                    <p>Workshop on 26th Nov</p>
                    <p>Exam Week from 1st Dec</p>
                </div>
                
                <div className="batch-section">
                    <h3>Batch Details</h3>
                    <p>Section: A</p>
                    <p>Year: Second</p>
                </div>
                
                <div className="rewards-box">
                    <h3>Rewards</h3>
                    <p>Badge: Top Scorer</p>
                    <p>Certificate: Coding Marathon</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
