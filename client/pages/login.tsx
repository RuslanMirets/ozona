import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '../utils/validations';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { FormField } from '../components/FormField';
import MainLayout from '../layouts/MainLayout';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useAppSelector';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const { login } = useActions();
  const { userData } = useAppSelector((state) => state.user);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (userData: any) => {
    login(userData);
  };

  const router = useRouter();
  useEffect(() => {
    userData && router.push('/profile');
  }, [userData]);

  if (userData) return <MainLayout title="Авторизация"></MainLayout>;

  return (
    <MainLayout title="Авторизация">
      <div className="auth">
        <Typography variant="h4" component="h4">
          Авторизация
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField type="email" label="Email" name="email" />
            <FormField type="password" label="Пароль" name="password" />
            <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting}>
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
        </FormProvider>
      </div>
    </MainLayout>
  );
};

export default Login;
