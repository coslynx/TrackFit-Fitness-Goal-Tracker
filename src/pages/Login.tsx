import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Alert } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { LoginData } from '../types';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate();
  const { login } = useAuthContext(); 
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data); 
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                label="Email or Username" 
                type="text" 
                {...register('username', { required: true })}
                error={!!errors.username} 
                helperText={errors.username?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Password" 
                type="password" 
                {...register('password', { required: true })}
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
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;