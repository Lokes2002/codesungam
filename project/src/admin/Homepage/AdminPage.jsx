// src/components/AdminPage/AdminPage.js
import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';

const AdminPage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Admin Dashboard
            </Typography>
            
            <Typography variant="h6" component="p" gutterBottom>
                Welcome to the Admin Panel. Here you can manage your application’s users, settings, and data.
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* Example of an admin control button */}
                <Grid item xs={12} sm={6} md={4}>
                    <Button variant="contained" color="primary" fullWidth>
                        Manage Users
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button variant="contained" color="secondary" fullWidth>
                        View Reports
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button variant="contained" color="warning" fullWidth>
                        Settings
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminPage;
