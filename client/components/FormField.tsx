import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => {
  const { register, formState } = useFormContext();

  return (
    <TextField
      {...register(name)}
      label={label}
      type={type}
      variant="outlined"
      size="small"
      error={!!formState.errors[name]?.message}
      helperText={formState.errors[name]?.message}
    />
  );
};
