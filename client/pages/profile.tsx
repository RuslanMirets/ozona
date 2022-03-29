import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { UserInfo } from '../components/UserInfo';
import { UserOrders } from '../components/UserOrders';
import { useAppSelector } from '../hooks/useAppSelector';
import MainLayout from '../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../store';
import { getUserOrders } from '../store/actions-creators/order';

const Profile: NextPage = () => {
  const { userData } = useAppSelector((state) => state.user);
  const { userOrders } = useAppSelector((state) => state.order);

  const router = useRouter();
  useEffect(() => {
    if (userData === null) {
      router.push('/');
    }
  }, [userData]);

  if (!userData) return <MainLayout title="Профиль"></MainLayout>;

  return (
    <MainLayout title="Профиль">
      <div className="profile">
        <UserInfo />
        <UserOrders orders={userOrders} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(getUserOrders(context));
  return { props: {} };
});

export default Profile;
