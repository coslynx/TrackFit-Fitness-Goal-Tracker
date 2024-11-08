import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface InputProps {
  label: string;
  type: 'text' | 'password' | 'email';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
    />
  );
};

export default Input;