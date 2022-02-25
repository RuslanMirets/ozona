import { Container } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { UserList } from '../components/UserList';
import MainLayout from '../layouts/MainLayout';

const Users: NextPage = () => {
  return (
    <MainLayout>
      <Container>
        <UserList />
      </Container>
    </MainLayout>
  );
};

export default Users;
