import { NextPage } from 'next';
import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { ParsedUrlQuery } from 'querystring';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getDetailOrder } from '../../store/actions-creators/order';
import { DetailOrder } from '../../components/DetailOrder';
import { useRouter } from 'next/router';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Button } from '@mui/material';

interface IParams extends ParsedUrlQuery {
  id: string;
}

const Order: NextPage = () => {
  const { detailOrder } = useAppSelector((state) => state.order);
  const { userData } = useAppSelector((state) => state.user);

  const router = useRouter();
  useEffect(() => {
    !userData && router.push('/');
  }, [userData]);

  if (!userData) return <MainLayout title="Детали заказа"></MainLayout>;

  return (
    <MainLayout title="Детали заказа">
      <div>
        <Button onClick={() => router.back()}>
          <ArrowBackOutlinedIcon /> Назад
        </Button>
      </div>
      <DetailOrder order={detailOrder} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params as IParams;
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(getDetailOrder(id));
  return { props: {} };
});

export default Order;
