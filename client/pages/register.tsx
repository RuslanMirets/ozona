import { Button, Container } from '@mui/material';
import React, { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { RegisterFormSchema } from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register } from '../store/actions/auth';
import { useRouter } from 'next/router';

const Register = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (userData: any) => {
    dispatch(register(userData));
    methods.reset();
  };

  const router = useRouter();
  useEffect(() => {
    if (userData) {
      router.push(`/profile/${userData.id}`);
    }
  }, [userData]);

  if (userData) {
    return <MainLayout title="Регистрация"></MainLayout>;
  }

  return (
    <MainLayout title="Регистрация">
      <Container>
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
            </form>
          </FormProvider>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Register;
