import { Button, Container } from '@mui/material';
import React, { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { LoginFormSchema } from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/actions/auth';
import router from 'next/router';

const Login = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (userData: any) => {
    dispatch(login(userData));
    methods.reset();
  };

  useEffect(() => {
    if (userData) {
      router.push('/');
    }
  }, [userData]);

  return (
    <MainLayout title="Авторизация">
      <Container>
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
            </form>
          </FormProvider>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Login;
