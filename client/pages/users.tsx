import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import MainLayout from '../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../store';
import { fetchUsers } from '../store/actions-creators/user';

const Users: NextPage = () => {
  const { users } = useAppSelector((state) => state.user);

  return (
    <MainLayout title="Пользователи">
      <Typography variant="h5" component="h5" sx={{ textAlign: 'center' }}>
        Пользователи
      </Typography>
      <Box>
        {users.map((user) => (
          <Typography key={user.id} variant="body1" component="div">
            {user.name} | {user.email} | {user.role[0].description}
          </Typography>
        ))}
      </Box>
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(fetchUsers());
  return { props: {} };
});

export default Users;
