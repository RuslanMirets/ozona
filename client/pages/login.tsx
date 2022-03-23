import { Button } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormField } from '../components/FormField';
import MainLayout from '../layouts/MainLayout';
import { LoginFormSchema } from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

const Login: NextPage = () => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <MainLayout title="Авторизация">
      <div className="auth">
        <h1>Авторизация</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField type="email" label="Email" name="email" />
            <FormField type="password" label="Пароль" name="password" />
            <Button
              type="submit"
              variant="contained"
              disabled={!methods.formState.isValid || methods.formState.isSubmitting}>
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
