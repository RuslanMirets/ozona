import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { CartItem } from '../components/CartItem';
import { ShippingForm } from '../components/ShippingForm';
import { IProduct } from '../interfaces/product';
import MainLayout from '../layouts/MainLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { cartSlice } from '../store/slices/cart';
import { getAPI } from '../utils/fetchData';

const Cart: NextPage = () => {
  const dispatch = useAppDispatch();
  const { cartData } = useAppSelector((state) => state.cart);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const response = cartData.reduce((prev: any, item: IProduct) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(response);
    };
    getTotal();
  }, [cartData]);

  useEffect(() => {
    const cartLocal =
      typeof window !== 'undefined' && localStorage.getItem('__next__cart__ozona')
        ? JSON.parse(localStorage.getItem('__next__cart__ozona') || '')
        : [];
    if (cartLocal && cartLocal.length > 0) {
      let newArr: any[] = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getAPI(`product/${item._id}`);
          const { _id, title, images, price, inStock, sold } = res.data;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }
        dispatch(cartSlice.actions.addToCart(newArr));
      };
      updateCart();
    }
  }, []);

  if (cartData.length === 0)
    return (
      <MainLayout title="Корзина">
        <h2>Корзина пуста</h2>
      </MainLayout>
    );

  return (
    <MainLayout title="Корзина">
      <div className="cart">
        <div className="cart__info">
          <h2>Корзина</h2>
          <div>
            {cartData.map((item) => (
              <CartItem key={item._id} item={item} dispatch={dispatch} cartData={cartData} />
            ))}
          </div>
        </div>
        <div className="cart__shipping">
          <h2>Доставка</h2>
          <ShippingForm total={total} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
