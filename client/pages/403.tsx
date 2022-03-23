import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Forbidden = () => {
  return (
    <MainLayout title='403'>
      <div className="errors-page">403 | Forbidden</div>
    </MainLayout>
  );
};

export default Forbidden;
