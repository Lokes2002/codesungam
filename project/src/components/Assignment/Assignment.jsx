import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Modal, TextField, Snackbar } from '@mui/material';
import axios from 'axios';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submission, setSubmission] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);  // State to manage Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // To display dynamic messages in Snackbar

  // Fetch assignments from backend
  useEffect(() => {
    axios.get('/api/assignments/')
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching assignments!', error);
      });
  }, []);

  const handleOpenModal = (assignment) => {
    setSelectedAssignment(assignment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAssignment(null);
    setSubmission('');
  };

  const handleSubmissionChange = (event) => {
    setSubmission(event.target.value);
  };

  const handleSubmit = () => {
    if (!submission) {
      alert('Please enter your submission!');
      return;
    }

    // Submit assignment to backend
    axios.post(`/api/assignments/submit/${selectedAssignment.id}`, { submissionContent: submission })
      .then((response) => {
        console.log('Assignment submission response:', response); // Log response to verify submission
        setSnackbarMessage('Assignment submitted successfully!');
        setOpenSnackbar(true); // Show success Snackbar

        // After successful submission, re-fetch assignments to display the updated list
        axios.get('/api/assignments/')
          .then((response) => {
            setAssignments(response.data); // Update the assignments list
          })
          .catch((error) => {
            console.error('Error fetching assignments after submission:', error);
          });

        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error submitting the assignment:', error);
        setSnackbarMessage('Error submitting the assignment. Please try again.');
        setOpenSnackbar(true); // Show error Snackbar
      });
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Assignments
      </Typography>
      
      <Grid container spacing={3}>
        {assignments.map((assignment) => (
          <Grid item xs={12} sm={6} md={4} key={assignment.id}>
            <Card onClick={() => handleOpenModal(assignment)} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6">{assignment.title}</Typography>
                <Typography color="textSecondary">Due Date: {assignment.dueDate}</Typography>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  View & Submit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Submission Modal */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="assignment-modal-title">
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: 400,
          bgcolor: 'white', p: 4, boxShadow: 24, borderRadius: 2
        }}>
          {selectedAssignment && (
            <>
              <Typography id="assignment-modal-title" variant="h6" gutterBottom>
                Submit for {selectedAssignment.title}
              </Typography>
              <TextField
                label="Your Submission"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={submission}
                onChange={handleSubmissionChange}
              />
              <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar for success or error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Assignment;
