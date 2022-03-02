import React, { useEffect } from 'react';
import { getUsers } from '../store/actions/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const UserList: React.FC = () => {
  const { users } = useAppSelector((state) => state.user);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} | {user.email} | {user.role[0].description}
        </li>
      ))}
    </ul>
  );
};
