import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { UserInfo } from '../components/UserInfo';
import MainLayout from '../layouts/MainLayout';
import { useAppSelector } from '../store/hooks';

const Profile: NextPage = () => {
  const { userData } = useAppSelector((state) => state.auth);

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
        <div className="profile__orders">
          <h3>Заказы</h3>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
