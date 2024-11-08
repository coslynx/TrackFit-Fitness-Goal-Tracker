import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { SignupData } from '../types';
import { sendVerificationEmail } from '../services/email';

const Signup: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signup } = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>();

  const onSubmit = async (data: SignupData) => {
    try {
      await signup(data);
      await sendVerificationEmail(data.email);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom align="center">
          Signup
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                {...register('password', { required: true, minLength: 8 })}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Signup
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Signup;