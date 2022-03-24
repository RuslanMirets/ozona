import { Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const NotFound: NextPage = () => {
  return (
    <MainLayout title="404">
      <Typography className="error-page" variant="h5" component="div">
        404 | Не найдено
      </Typography>
    </MainLayout>
  );
};

export default NotFound;
