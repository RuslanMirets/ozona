import { Button, TextField } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Login: NextPage = () => {
  return (
    <MainLayout title="Авторизация">
      <div className="auth">
        <h1>Авторизация</h1>
        <form>
          <TextField type="email" label="Email" variant="outlined" size="small" />
          <TextField type="password" label="Пароль" variant="outlined" size="small" />
          <Button type="submit" variant="contained">
            Войти
          </Button>
          <div>
            У вас нет аккаунта?
            <Button variant="text">
              <Link href="/register">
                <a>Зарегистрироваться</a>
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
