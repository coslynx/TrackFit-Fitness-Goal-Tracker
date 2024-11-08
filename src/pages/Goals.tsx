import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { GoalsData, GoalData } from '../types';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../services/goals';

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<GoalsData[]>([]);
  const [newGoal, setNewGoal] = useState<GoalData>({
    title: '',
    description: '',
    targetDate: new Date(),
    progress: 0,
  });
  const [editingGoal, setEditingGoal] = useState<GoalData | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm<GoalData>();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsData = await getGoals();
        setGoals(goalsData);
      } catch (error) {
        setError(error.message);
      }
    };
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (editingGoal) {
      setEditingGoal({ ...editingGoal, [name]: value });
    } else {
      setNewGoal({ ...newGoal, [name]: value });
    }
  };

  const handleGoalSubmit = async (data: GoalData) => {
    try {
      if (editingGoal) {
        await updateGoal(editingGoal.id, data);
        setShowEditModal(false);
      } else {
        await createGoal(data);
      }
      setNewGoal({ title: '', description: '', targetDate: new Date(), progress: 0 });
      setEditingGoal(null);
      fetchGoals();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
      fetchGoals();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditGoal = (goal: GoalData) => {
    setEditingGoal(goal);
    setShowEditModal(true);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">
        Your Fitness Goals
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Create New Goal
          </Typography>
          <form onSubmit={handleSubmit(handleGoalSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Goal Title"
                  name="title"
                  value={newGoal.title || ''}
                  onChange={handleGoalChange}
                  fullWidth
                  {...register('title', { required: true })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={newGoal.description || ''}
                  onChange={handleGoalChange}
                  fullWidth
                  {...register('description', { required: true })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Target Date"
                  name="targetDate"
                  type="date"
                  value={newGoal.targetDate ? newGoal.targetDate.toISOString().slice(0, 10) : ''}
                  onChange={handleGoalChange}
                  fullWidth
                  {...register('targetDate', { required: true })}
                  error={!!errors.targetDate}
                  helperText={errors.targetDate?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {editingGoal ? 'Update Goal' : 'Add Goal'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Your Goals
          </Typography>
          {goals.length > 0 ? (
            <Grid container spacing={2}>
              {goals.map((goal) => (
                <Grid item xs={12} key={goal.id}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="subtitle1">{goal.title}</Typography>
                      <Typography variant="body2">{goal.description}</Typography>
                      <Typography variant="body2">Target Date: {new Date(goal.targetDate).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" color="secondary" onClick={() => handleEditGoal(goal)}>
                        Edit
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" color="error" onClick={() => handleDeleteGoal(goal.id)}>
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" align="center" gutterBottom>
              You have no goals yet. Start by adding one!
            </Typography>
          )}
        </Grid>
      </Grid>
      {/* Edit Goal Modal */}
      {showEditModal && editingGoal && (
        <div className="modal">
          <div className="modal-content">
            <Typography variant="h6" gutterBottom align="center">
              Edit Goal
            </Typography>
            <form onSubmit={handleSubmit(handleGoalSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Goal Title"
                    name="title"
                    value={editingGoal.title || ''}
                    onChange={handleGoalChange}
                    fullWidth
                    {...register('title', { required: true })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={editingGoal.description || ''}
                    onChange={handleGoalChange}
                    fullWidth
                    {...register('description', { required: true })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Target Date"
                    name="targetDate"
                    type="date"
                    value={editingGoal.targetDate ? editingGoal.targetDate.toISOString().slice(0, 10) : ''}
                    onChange={handleGoalChange}
                    fullWidth
                    {...register('targetDate', { required: true })}
                    error={!!errors.targetDate}
                    helperText={errors.targetDate?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Goal
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;