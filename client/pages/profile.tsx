import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { UserInfo } from '../components/UserInfo';
import { useAppSelector } from '../hooks/useAppSelector';
import MainLayout from '../layouts/MainLayout';

const Profile: NextPage = () => {
  const { userData } = useAppSelector((state) => state.user);

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
      </div>
    </MainLayout>
  );
};

export default Profile;
