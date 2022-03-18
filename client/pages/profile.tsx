import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Button, IconButton, TextField } from '@mui/material';
import { resetPassword, updateName } from '../store/actions/user';
import { alertSlice } from '../store/slices/alert';
import { uploadAvatar } from '../utils/uploadImages';

const Profile: NextPage = () => {
  const initialSate = {
    avatar: '' as any,
    name: '',
    password: '',
    cf_password: '',
  };

  const [data, setData] = useState(initialSate);
  const { avatar, name, password, cf_password } = data;

  const disptach = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);

  const router = useRouter();
  useEffect(() => {
    if (userData === null) {
      router.push('/');
    }
  }, [userData]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userData) setData({ ...data, name: userData.name });
  }, [userData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUpdateProfile = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password) disptach(resetPassword({ password: data.password }));
    if (data.name !== userData?.name) disptach(updateName({ name: data.name }));
    if (avatar) {
      updateAvatar();
      disptach(alertSlice.actions.success('Аватар обновлен'));
    }
  };

  const updateAvatar = async () => {
    let result = [];
    if (avatar) {
      const { filename } = await uploadAvatar(avatar);
      result.push({ filename: filename });
    }
  };

  const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return disptach(alertSlice.actions.errors('Файл не существует'));
    if (file.size > 1024 * 1024)
      return disptach(alertSlice.actions.errors('Большой размер изображения'));
    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png')
      return disptach(alertSlice.actions.errors('Неверный формат изображения'));

    setData({ ...data, avatar: file });
  };

  if (!userData) return null;

  return (
    <MainLayout title="Профиль">
      <div className="profile">
        <div className="profile__info">
          <h3>{userData.role === 'user' ? 'Профиль пользователя' : 'Профиль админа'}</h3>
          <div className="profile__avatar" onClick={handleClickImage}>
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `http://localhost:5000/upload/avatar/${userData.avatar}`
              }
              alt="avatar"
            />
            <span>
              <IconButton>
                <PhotoCameraIcon />
              </IconButton>
              <input type="file" name="avatar" onChange={changeAvatar} ref={inputRef} />
            </span>
          </div>
          <TextField
            type="text"
            label="Имя"
            size="small"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <TextField
            type="email"
            label="Email"
            size="small"
            name="email"
            defaultValue={userData.email}
            disabled
          />
          <TextField
            type="password"
            label="Пароль"
            size="small"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <TextField
            type="password"
            label="Подтверждение пароль"
            size="small"
            name="cf_password"
            value={cf_password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" onClick={handleUpdateProfile}>
            Изменить
          </Button>
        </div>
        <div className="profile__orders">
          <h3>Заказы</h3>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
