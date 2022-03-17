import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Button, IconButton } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProfileFormSchema } from '../utils/validation';
import { resetPassword } from '../store/actions/user';
import { userSlice } from '../store/slices/user';

const Profile: NextPage = () => {
  const disptach = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);

  const router = useRouter();
  useEffect(() => {
    if (userData === null) {
      router.push('/');
    }
  }, [userData]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickAvatar = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const methods = useForm({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      password: '',
      cf_password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(UpdateProfileFormSchema),
  });

  const handleUpdateProfile = (data: any) => {
    disptach(resetPassword(data));
    methods.reset({ ...methods.getValues(), password: '', cf_password: '' });
  };

  if (!userData) return null;

  return (
    <MainLayout title="Профиль">
      <div className="profile">
        <div className="profile__info">
          <h3>{userData.role === 'user' ? 'Профиль пользователя' : 'Профиль админа'}</h3>
          <div className="profile__avatar">
            <img src={userData.avatar} alt={userData.avatar} />
            <span onClick={handleClickAvatar}>
              <IconButton>
                <PhotoCameraIcon />
              </IconButton>
              <input ref={inputRef} type="file" name="file" id="file-upload" hidden />
            </span>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleUpdateProfile)}>
              <FormField type="text" label="Имя" name="name" />
              <FormField type="email" label="Email" name="email" disabled />
              <FormField type="password" label="Новый пароль" name="password" />
              <FormField type="password" label="Повторите пароль" name="cf_password" />
              <Button
                type="submit"
                variant="contained"
                disabled={!methods.formState.isValid || methods.formState.isSubmitting}>
                Изменить
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="profile__orders">
          <h3>Заказы</h3>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
