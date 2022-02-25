import { NextPage } from 'next';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const NotFound: NextPage = () => {
  return (
    <MainLayout title="404">
      <div className="not-found">
        <h1>404 | Такой странце не существует</h1>
      </div>
    </MainLayout>
  );
};

export default NotFound;
