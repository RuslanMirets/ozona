import { Button } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { FormField } from '../components/FormField';
import MainLayout from '../layouts/MainLayout';
import { RegisterFormSchema } from '../utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from '../store/hooks';
import { register } from '../store/actions/auth';

const Register: NextPage = () => {
  const dispatch = useAppDispatch();

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (userData: any) => {
    dispatch(register(userData));
    // methods.reset();
  };

  return (
    <MainLayout title="Регистрация">
      <div className="auth">
        <h1>Регистрация</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField type="text" label="Имя" name="name" />
            <FormField type="email" label="Email" name="email" />
            <FormField type="password" label="Пароль" name="password" />
            <Button
              type="submit"
              variant="contained"
              disabled={!methods.formState.isValid || methods.formState.isSubmitting}>
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
        </FormProvider>
      </div>
    </MainLayout>
  );
};

export default Register;
