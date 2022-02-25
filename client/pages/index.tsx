import { Container } from '@mui/material';
import type { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Container>Home page</Container>
    </MainLayout>
  );
};

export default Home;
