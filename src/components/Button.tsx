import React from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
}

const MyButton: React.FC<ButtonProps> = ({ text, onClick, variant, color, disabled }) => {
  return (
    <Button
      variant={variant || 'contained'}
      color={color || 'primary'}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default MyButton;