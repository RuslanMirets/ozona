import { Container } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useAppSelector } from '../../store/hooks';

const AdminPage: NextPage = () => {
  const { user } = useAppSelector((state) => state.user);

  const isAdmin = user?.role[0].value === 'ADMIN';

  const router = useRouter();
  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, []);

  return (
    <MainLayout title="Страница администратора">
      <Container></Container>
    </MainLayout>
  );
};

export default AdminPage;
