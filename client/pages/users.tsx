import { NextPage } from 'next';
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Api } from '../utils/api';
import { IUser } from '../utils/interfaces/user';

interface IProps {
  users: IUser[];
}

const Users: NextPage<IProps> = ({ users }) => {
  return (
    <MainLayout title="Пользователи">
      {users.map((user) => (
        <div key={user.id}>
          {user.name} | {user.email} | {user.role[0].description}
        </div>
      ))}
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: any) => {
  try {
    const userData = await Api(ctx).user.getProfile();
    if (userData.role[0].value !== 'ADMIN') {
      ctx.res?.writeHead(302, {
        Location: '/403',
      });
      ctx.res?.end();
    }

    const users = await Api().user.getAll();
    return { props: { users } };
  } catch (error) {
    console.log(error);
  }
  return { props: { users: null } };
};

export default Users;
