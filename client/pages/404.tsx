import React from 'react';
import MainLayout from '../layouts/MainLayout';

const NotFound = () => {
  return (
    <MainLayout title="404">
      <div className="errors-page">404 | Not Found</div>
    </MainLayout>
  );
};

export default NotFound;
