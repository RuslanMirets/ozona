import { NextPage } from 'next';
import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import MainLayout from '../layouts/MainLayout';

const Cart: NextPage = () => {
  const { cartData } = useAppSelector((state) => state.cart);

  if (cartData.length === 0) {
    return (
      <MainLayout title="Корзина">
        <h1>Корзина пуста</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Корзина">
      <h1>Корзина </h1>
    </MainLayout>
  );
};

export default Cart;
