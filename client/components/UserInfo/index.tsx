import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SERVER } from '../../utils/constants';
import { UpdateProfileFormSchema } from '../../utils/validation';
import { FormField } from '../FormField';
import { UploadFile } from '../UploadFile';
import styles from './UserInfo.module.scss';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { resetPassword, updateName } from '../../store/actions/user';
import { alertSlice } from '../../store/slices/alert';
import { uploadAvatar } from '../../utils/uploadImages';

export const UserInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);

  const [errorMessage, setErrorMessage] = React.useState('');

  const initialState = {
    avatar: '' as any,
    name: userData?.name,
  };

  const [data, setData] = useState(initialState);
  const { avatar, name } = data;

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(UpdateProfileFormSchema),
    defaultValues: {
      name: '',
      email: userData?.email,
      password: '',
      cf_password: '',
    },
  });
  const { password, cf_password } = methods.getValues();

  const handleUpdateProfile = (e: FormEvent<HTMLButtonElement>) => {
    // password
    if (methods.formState.isValid && cf_password.length > 5) {
      dispatch(resetPassword({ password: password }));
      methods.reset({ password: '', cf_password: '' });
      setErrorMessage('');
    } else if (password.length === 0) {
      setErrorMessage('');
    } else {
      setErrorMessage('Пароли не совпадают');
    }
    //avatar
    if (avatar) {
      updateAvatar();
      dispatch(alertSlice.actions.success('Аватар обновлен'));
    }
    //name
    if (name !== userData?.name) {
      dispatch(updateName({ name }));
    } else if (name?.length === 0) {
      dispatch(alertSlice.actions.errors('Введите имя'));
    }
  };

  const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return dispatch(alertSlice.actions.errors('Файл не существует'));
    if (file.size > 1024 * 1024)
      return dispatch(alertSlice.actions.errors('Большой размер изображения'));
    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png')
      return dispatch(alertSlice.actions.errors('Неверный формат изображения'));

    setData({ ...data, avatar: file });
  };

  const updateAvatar = async () => {
    let result = [];
    if (avatar) {
      const { filename } = await uploadAvatar(avatar);
      result.push({ filename: filename });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className={styles.info}>
      <h3>{userData?.role === 'user' ? 'Профиль пользователя' : 'Профиль админа'}</h3>
      <FormProvider {...methods}>
        <div className={styles.avatar}>
          {userData?.avatar ? (
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${SERVER}/upload/avatar/${userData?.avatar}`
              }
              alt="avatar"
            />
          ) : (
            <img src="/assets/images/avatar.png" alt="avatar" />
          )}
          <span>
            <IconButton>
              <PhotoCameraIcon />
            </IconButton>
            <UploadFile name="avatar" onChange={changeAvatar} />
          </span>
        </div>
        <TextField
          type="text"
          label="Имя"
          name="name"
          size="small"
          value={name}
          onChange={handleChange}
        />
        <FormField type="email" label="Email" name="email" disabled />
        <FormField type="password" label="Пароль" name="password" />
        <FormField type="password" label="Подтверждение пароль" name="cf_password" />
        {errorMessage && (
          <Alert severity="error" className="mb-20">
            {errorMessage}
          </Alert>
        )}
        <Button variant="contained" onClick={handleUpdateProfile}>
          Изменить
        </Button>
      </FormProvider>
    </div>
  );
};
