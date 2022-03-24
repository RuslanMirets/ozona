import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '../utils/validations';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { FormField } from '../components/FormField';
import MainLayout from '../layouts/MainLayout';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useAppSelector';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const { register } = useActions();
  const { userData } = useAppSelector((state) => state.user);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (registerData: any) => {
    register(registerData);
    methods.reset();
  };

  const router = useRouter();
  useEffect(() => {
    userData && router.push('/');
  }, [userData]);

  if (userData) return <MainLayout title="Регистрация"></MainLayout>;

  return (
    <MainLayout title="Регистрация">
      <div className="auth">
        <Typography variant="h4" component="h4">
          Регистрация
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField type="text" label="Имя" name="name" />
            <FormField type="email" label="Email" name="email" />
            <FormField type="password" label="Пароль" name="password" />
            <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting}>
              Войти
            </Button>
            <div>
              Есть аккаунта?
              <Button variant="text">
                <Link href="/login">
                  <a>Войти</a>
                </Link>
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </MainLayout>
  );
};

export default Register;
