import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useEffect } from 'react';
import { UserInfo } from '../components/UserInfo';
import { UserOrders } from '../components/UserOrders';
import { useAppSelector } from '../hooks/useAppSelector';
import MainLayout from '../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../store';
import { getOrders, getUserOrders } from '../store/actions-creators/order';
import { getAPI } from '../utils/fetchData';

const Profile: NextPage = () => {
  const { userData } = useAppSelector((state) => state.user);
  const { orders } = useAppSelector((state) => state.order);

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
        <UserOrders orders={orders} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { ozonaToken } = parseCookies(context);
  const { data } = await getAPI('user/profile', ozonaToken);

  const dispatch = store.dispatch as NextThunkDispatch;

  if (data.role[0].UserRole.roleId === 2) {
    await dispatch(getUserOrders(context));
  } else if (data.role[0].UserRole.roleId === 1) {
    await dispatch(getOrders(context));
  }

  return { props: {} };
});

export default Profile;
