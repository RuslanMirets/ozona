import React from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  hidden?: boolean;
  onChange?: any;
  id?: string;
}

export const UploadFile: React.FC<IProps> = ({ name, hidden, onChange, id }) => {
  const { register } = useFormContext();

  return <input {...register(name)} type="file" onChange={onChange} hidden={hidden} id={id} />;
};
