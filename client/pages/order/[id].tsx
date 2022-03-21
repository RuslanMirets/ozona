import { NextPage } from 'next';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useAppSelector } from '../../store/hooks';
import { getDetailOrder } from '../../store/actions/order';
import { wrapper } from '../../store';
import { ParsedUrlQuery } from 'querystring';
import { DetailOrder } from '../../components/DetailOrder';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

interface IParams extends ParsedUrlQuery {
  id: string;
}

const Order: NextPage = () => {
  const { orderData } = useAppSelector((state) => state.order);

  const router = useRouter();

  return (
    <MainLayout title="Детали заказа">
      <div>
        <Button onClick={() => router.back()}>
          <ArrowBackOutlinedIcon /> Назад
        </Button>
      </div>
      <DetailOrder order={orderData} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params as IParams;
  await store.dispatch(getDetailOrder(id));
  return { props: {} };
});

export default Order;
