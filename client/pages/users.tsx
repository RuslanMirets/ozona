import { Container } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { UserList } from '../components/UserList';
import MainLayout from '../layouts/MainLayout';
import { getUsers } from '../store/actions/user';
import { wrapper } from '../store/store';

const Users: NextPage = () => {
  return (
    <MainLayout>
      <Container>
        <UserList />
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getUsers());
  return { props: {} };
});

export default Users;
