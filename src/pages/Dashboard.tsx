import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, LinearProgress, List, ListItem, ListItemText } from '@mui/material';
import { useAuthContext } from '../hooks/useAuth';
import { getGoals } from '../services/goals';
import { getWorkoutLogs } from '../services/workoutLogs';
import { GoalsData, WorkoutLogData } from '../types';

const Dashboard: React.FC = () => {
  const [goals, setGoals] = useState<GoalsData[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLogData[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsData = await getGoals();
        setGoals(goalsData);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    const fetchWorkoutLogs = async () => {
      try {
        const workoutLogsData = await getWorkoutLogs();
        setWorkoutLogs(workoutLogsData);
      } catch (error) {
        console.error('Error fetching workout logs:', error);
      }
    };

    if (user) {
      fetchGoals();
      fetchWorkoutLogs();
    }
  }, [user]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom align="center">
          Your Fitness Progress
        </Typography>
        <Grid container spacing={2}>
          {goals.map((goal) => (
            <Grid item xs={12} key={goal.id}>
              <Card>
                <Typography variant="h6" gutterBottom align="center">
                  {goal.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {goal.description}
                </Typography>
                <LinearProgress variant="determinate" value={goal.progress} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom align="center">
          Recent Workouts
        </Typography>
        <List>
          {workoutLogs.map((log) => (
            <ListItem key={log.id}>
              <ListItemText primary={log.exerciseType} secondary={`Duration: ${log.duration}`} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Dashboard;