import { Button, Container } from '@mui/material';
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { RegisterFormSchema } from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import FormField from '../components/FormField';

const Register = () => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (userData: any) => {
    console.log(userData);
    methods.reset({ ...userData });
  };

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
