import React, { useState } from 'react';
import { Button, Grid, Box, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // Import Axios for API calls
import AuthModal from './AuthModel'; 

const Authentication = () => {
    const [openAuthModel, setOpenAuthModel] = useState(false);
    const [loginType, setLoginType] = useState('user'); // Default 'user' login type

    const handleOpenAuthModel = () => setOpenAuthModel(true);
    const handleCloseAuthModel = () => setOpenAuthModel(false);

    // Handle Google Login Success
    const handleGoogleLogin = async (response) => {
        try {
            const { tokenId } = response;  // Get the tokenId from Google response

            // Backend endpoint to verify Google token
            const res = await axios.post('http://localhost:5000/auth/google-signin', {
                token: tokenId,
            });

            // If response is successful, store token in localStorage
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);  // Store JWT token in localStorage
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during Google Login:', error);
        }
    };

    // Handle login type change
    const handleLoginTypeChange = (event) => {
        setLoginType(event.target.value); // Update login type based on selection
    };

    return (
        <Box
            sx={{
                fontFamily: '"Poppins", sans-serif',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                display: 'flex',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                textAlign: 'center',
                padding: '0 10px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '90%', sm: '90%', md: '70%', lg: '50%' },
                    background: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background to improve readability
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '10px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    transition: 'height 0.2s ease',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: { xs: '20px', sm: '40px' },
                }}
            >
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ px: 3 }}>
                        <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem', lg: '4rem' } }}>
                            LET'S JOIN US
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', py: 4, fontSize: { xs: '1.5rem', sm: '2rem', lg: '2.5rem' } }}>
                            ENJOY THIS MOMENT TODAY
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: '330px', mx: 'auto' }}>
                            {/* Google Login Button */}
                            <GoogleLogin 
                                onSuccess={handleGoogleLogin} // Pass the success function
                                onFailure={(response) => console.error(response)} // Handle failure
                                width={330} 
                            />
                            <Typography variant="body1" sx={{ py: 2 }}>
                                OR
                            </Typography>

                            {/* Login Type Selection: User or Admin */}
                            <RadioGroup
                                value={loginType}
                                onChange={handleLoginTypeChange}
                                row
                                sx={{ justifyContent: 'center', mb: 2 }}
                            >
                                <FormControlLabel value="user" control={<Radio />} label="User" sx={{ color: 'white' }} />
                                <FormControlLabel value="admin" control={<Radio />} label="Admin" sx={{ color: 'white' }} />
                            </RadioGroup>

                            {/* Render 'Create Account' Button only for 'user' */}
                            {loginType === 'user' && (
                                <Button 
                                    onClick={handleOpenAuthModel} 
                                    fullWidth 
                                    variant="contained" 
                                    size="large" 
                                    sx={{ borderRadius: '29px', py: 1 }}
                                >
                                    Create Account
                                </Button>
                            )}

                            <Typography variant="body2" sx={{ mt: 2 }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Already Have Account
                            </Typography>
                            <Button 
                                onClick={handleOpenAuthModel} 
                                fullWidth 
                                variant="outlined" 
                                size="large" 
                                sx={{ 
                                    borderRadius: '28px', 
                                    py: 1,
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                    }
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
            </Box>
        </Box>
    );
}

export default Authentication;
