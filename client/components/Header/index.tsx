import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { Container } from '@mui/material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/actions/auth';
import { profile } from '../../store/actions/user';
import { useRouter } from 'next/router';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  const isAdmin = user?.role[0].value === 'ADMIN';

  useEffect(() => {
    dispatch(profile());
  }, []);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.body}>
          <Link href="/">
            <a className={styles.logo}>OZONA</a>
          </Link>
          <ul className={styles.menu}>
            <li>
              <Link href="/">
                <a>Главная</a>
              </Link>
            </li>
            <li>
              <Link href="/catalog">
                <a>Каталог</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>О нас</a>
              </Link>
            </li>
            <li>
              <Link href="/contacts">
                <a>Контакты</a>
              </Link>
            </li>
            <li>
              <Link href="/users">
                <a>Список пользователей</a>
              </Link>
            </li>
          </ul>
          <ul className={styles.actions}>
            {userData ? (
              <>
                <li>
                  <Link href={`/profile/${userData.id}`}>
                    <a>Профиль</a>
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link href="/admin">
                      <a>Панель администратора</a>
                    </Link>
                  </li>
                )}
                <li style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  Выйти
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <a>Войти</a>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <a>Зарегистрироваться</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
};
