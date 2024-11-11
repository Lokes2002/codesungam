import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Modal, Box, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import CustomNavba from './nav';
import axios from 'axios';

const AdminPage = () => {
    const [open, setOpen] = useState(false);
    const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
    const [noticeModalOpen, setNoticeModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [noticeText, setNoticeText] = useState('');
    
    // State for the assignment form fields
    const [topicName, setTopicName] = useState('');
    const [description, setDescription] = useState('');
    const [submissionDate, setSubmissionDate] = useState('');
    
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAssignmentOpen = () => {
        setAssignmentModalOpen(true);
        setOpen(false);
    };
    const handleAssignmentClose = () => setAssignmentModalOpen(false);

    const handleNoticeOpen = () => {
        setNoticeModalOpen(true);
        setOpen(false);
    };
    const handleNoticeClose = () => setNoticeModalOpen(false);

    const handleFileChange = async (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        setFileName(uploadedFile.name);

        // Upload file to Cloudinary
        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, // Replace with your Cloudinary cloud name
                formData
            );
            console.log(response.data); // You can store the URL here to save in the backend
            // You can store the response.data.secure_url (Cloudinary file URL) if needed
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleDiscardFile = () => {
        setFile(null);
        setFileName('');
    };

    const handleNoticeChange = (event) => {
        setNoticeText(event.target.value);
    };

    const handleAddDetailsClick = () => {
        navigate('/userdetails');
    };

    const handleAssignmentSubmit = () => {
        // Handle the form submission (e.g., send to API)
        console.log('Assignment Data:', {
            topicName,
            description,
            file,
            submissionDate,
        });

        // Reset form fields after submission
        setTopicName('');
        setDescription('');
        setFile(null);
        setFileName('');
        setSubmissionDate('');
        handleAssignmentClose();
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
        textAlign: 'center',
    };

    const assignmentModalStyle = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
    };

    const noticeModalStyle = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
    };

    return (
        <>
            <CustomNavba />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Admin Dashboard
                </Typography>

                <Typography variant="h6" component="p" gutterBottom>
                    Welcome to the Admin Panel. Here you can manage your application’s users, settings, and data.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
                            Manage Users
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button variant="contained" color="secondary" fullWidth onClick={handleAddDetailsClick}>
                            Add Details
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button variant="contained" color="warning" fullWidth>
                            Settings
                        </Button>
                    </Grid>
                </Grid>

                {/* Main Modal for Manage Users */}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={modalStyle}>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" gutterBottom>
                            Manage Users
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleAssignmentOpen}
                        >
                            Add Assignment
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleNoticeOpen}
                        >
                            Add Notice
                        </Button>
                    </Box>
                </Modal>

                {/* Assignment Modal */}
                <Modal open={assignmentModalOpen} onClose={handleAssignmentClose}>
                    <Box sx={assignmentModalStyle}>
                        <IconButton
                            aria-label="close"
                            onClick={handleAssignmentClose}
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h5" gutterBottom>
                            Add Assignment
                        </Typography>
                        <TextField
                            fullWidth
                            label="Topic Name"
                            variant="outlined"
                            sx={{ mt: 2 }}
                            value={topicName}
                            onChange={(e) => setTopicName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            sx={{ mt: 2 }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* File Upload with Preview, Name, and Discard */}
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                {file && (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="File Preview"
                                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" component="label" fullWidth>
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                {fileName && (
                                    <>
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                            {fileName}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            onClick={handleDiscardFile}
                                        >
                                            Discard
                                        </Button>
                                    </>
                                )}
                            </Grid>
                        </Grid>

                        <TextField
                            fullWidth
                            label="Date of Submission"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            sx={{ mt: 2 }}
                            value={submissionDate}
                            onChange={(e) => setSubmissionDate(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={handleAssignmentSubmit} // Submit the assignment
                        >
                            Send
                        </Button>
                    </Box>
                </Modal>

                {/* Notice Modal */}
                <Modal open={noticeModalOpen} onClose={handleNoticeClose}>
                    <Box sx={noticeModalStyle}>
                        <IconButton
                            aria-label="close"
                            onClick={handleNoticeClose}
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h5" gutterBottom>
                            Add Notice
                        </Typography>
                        <TextField
                            fullWidth
                            label="Notice"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={noticeText}
                            onChange={handleNoticeChange}
                            sx={{ mt: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleNoticeClose} // Close without saving
                        >
                            Submit
                        </Button>
                    </Box>
                </Modal>
            </Container>
        </>
    );
};

export default AdminPage;
