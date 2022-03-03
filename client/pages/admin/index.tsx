import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../../components/FormField';
import MainLayout from '../../layouts/MainLayout';
import { useAppSelector } from '../../store/hooks';
import { CreateProductFormSchema } from '../../utils/validations';

const AdminPage: NextPage = () => {
  const { userData } = useAppSelector((state) => state.auth);

  const isAdmin = userData?.role[0].value === 'ADMIN';

  const router = useRouter();
  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, []);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(CreateProductFormSchema),
  });

  const onSubmit = (productData: any) => {
    console.log(productData);
    methods.reset();
  };

  return (
    <MainLayout title="Страница администратора">
      <Container>
        <div className="create-product">
          <h1>Добавить продукт</h1>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormField type="text" label="Название" name="name" />
              <FormField type="text" label="Цена" name="price" />
              <Button type="submit" variant="contained">
                Добавить
              </Button>
            </form>
          </FormProvider>
        </div>
      </Container>
    </MainLayout>
  );
};

export default AdminPage;
