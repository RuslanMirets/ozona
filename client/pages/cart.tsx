import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CartItem } from '../components/CartItem';
import { ShippingForm } from '../components/ShippingForm';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useAppSelector';
import MainLayout from '../layouts/MainLayout';
import { CartActionTypes } from '../types/cart';
import { IProduct } from '../types/product';
import { getAPI } from '../utils/fetchData';

const Cart: NextPage = () => {
  const dispatch = useDispatch();
  const { increaseQuantity, decreaseQuantity } = useActions();
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
    if (cartData && cartData.length > 0) {
      let newArr: any[] = [];
      const updateCart = async () => {
        for (const item of cartData) {
          const res = await getAPI(`product/${item.id}`);
          const { id, title, images, price, inStock, sold } = res.data;
          if (inStock > 0) {
            newArr.push({
              id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }
        dispatch({ type: CartActionTypes.ADD_TO_CART, payload: newArr });
      };
      updateCart();
    }
  }, []);

  if (cartData.length === 0) {
    return (
      <MainLayout title="Корзина">
        <h1>Корзина пуста</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Корзина">
      <div className="cart">
        <div className="cart__info">
          <h2>Корзина</h2>
          <div>
            {cartData.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increase={increaseQuantity}
                decrease={decreaseQuantity}
              />
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
