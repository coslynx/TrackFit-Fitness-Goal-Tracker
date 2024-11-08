import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>
        TrackFit: Your Journey to Fitness Success
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        TrackFit is a web application designed to empower you to track your fitness goals, set personalized plans, and share your progress with friends.
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Key Features:
      </Typography>
      <ul style={{ listStyle: 'none', padding: '0', textAlign: 'center' }}>
        <li>Set SMART Goals</li>
        <li>Track Workouts and Progress</li>
        <li>Connect with a Supportive Community</li>
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Link to="/login">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="contained" color="primary">
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;