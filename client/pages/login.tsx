import { Alert, Button } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormField } from '../components/FormField';
import MainLayout from '../layouts/MainLayout';
import { LoginFormSchema } from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCookie } from 'nookies';
import { login, selectUserData } from '../redux/slices/user';
import { Api } from '../utils/api';
import { useRouter } from 'next/router';
import { wrapper } from '../redux/store';

const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  // const router = useRouter();

  const onSubmit = async (dto: any) => {
    try {
      const data = await Api().user.login(dto);
      setCookie(null, 'ozonaToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setErrorMessage('');
      dispatch(login(data));
      // router.push('/');
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const userData = useAppSelector(selectUserData);

  return (
    <MainLayout title="Авторизация">
      <div className="auth">
        {userData && 'ddd'}
        <h1>Авторизация</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField type="email" label="Email" name="email" />
            <FormField type="password" label="Пароль" name="password" />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   try {
//     const user = await Api(ctx).user.getProfile();
//     return { props: { user } };
//   } catch (error: any) {
//     console.log(error.response.data.message);
//     return { props: {} };
//   }
// };



export default Login;
