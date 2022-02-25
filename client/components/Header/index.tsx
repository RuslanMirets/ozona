import React from 'react';
import styles from './Header.module.scss';
import { Container } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  const userData = false;

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
              <Link href="/about">
                <a>О нас</a>
              </Link>
            </li>
            <li>
              <Link href="/contacts">
                <a>Контакты</a>
              </Link>
            </li>
          </ul>
          <ul className={styles.actions}>
            {userData ? (
              <>
                <li>
                  <Link href="#">
                    <a>Профиль</a>
                  </Link>
                </li>
                <li>Выйти</li>
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

export default Header;
