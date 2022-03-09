import { Button, TextField } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Register: NextPage = () => {
  return (
    <MainLayout title="Регистрация">
      <div className="auth">
        <h1>Регистрация</h1>
        <form>
          <TextField type="text" label="Имя" variant="outlined" size="small" />
          <TextField type="email" label="Email" variant="outlined" size="small" />
          <TextField type="password" label="Пароль" variant="outlined" size="small" />
          <Button type="submit" variant="contained">
            Зарегистрироваться
          </Button>
          <div>
            Есть аккаунт?
            <Button variant="text">
              <Link href="/login">
                <a>Войти</a>
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Register;
