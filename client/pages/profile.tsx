import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { UserInfo } from '../components/UserInfo';
import { UserOrders } from '../components/UserOrders';
import MainLayout from '../layouts/MainLayout';
import { wrapper } from '../store';
import { getOrders, getUserOrders } from '../store/actions/order';
import { useAppSelector } from '../store/hooks';

const Profile: NextPage = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);

  const router = useRouter();
  useEffect(() => {
    if (userData === null) {
      router.push('/');
    }
  }, [userData]);

  if (!userData) return null;

  return (
    <MainLayout title="Профиль">
      <div className="profile">
        <UserInfo />
        <UserOrders orders={orders} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(getUserOrders(context));
  // await store.dispatch(getOrders());

  return { props: {} };
});

export default Profile;
