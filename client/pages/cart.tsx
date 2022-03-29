import { Button } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CartItem } from '../components/CartItem';
import { CartItemsModal } from '../components/Modals/CartItemsModal';
import { ShippingForm } from '../components/ShippingForm';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useAppSelector';
import MainLayout from '../layouts/MainLayout';
import { CartActionTypes } from '../types/cart';
import { IProduct } from '../types/product';
import { getAPI } from '../utils/fetchData';

const Cart: NextPage = () => {
  const dispatch = useDispatch();
  const { increaseQuantity, decreaseQuantity, deleteItems } = useActions();
  const { cartData } = useAppSelector((state) => state.cart);

  const [total, setTotal] = useState(0);

  const [callback, setCallback] = useState(false);

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
          const response = await getAPI(`product/${item.id}`);
          const { id, title, images, price, inStock, sold } = response.data;
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
  }, [callback]);

  const [openModal, setOpenModal] = useState(false);
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  if (cartData.length === 0) {
    return (
      <MainLayout title="Корзина">
        <div className="cart">
          <img className="empty-cart" src="/assets/images/empty-cart.jpg" alt="empty-cart" />
        </div>
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
          <Button
            sx={{ display: 'flex', margin: '20px 0 0 auto' }}
            variant="contained"
            color="error"
            onClick={handleToggleModal}>
            Удалить все
          </Button>
        </div>
        <div className="cart__shipping">
          <h2>Доставка</h2>
          <ShippingForm total={total} callback={callback} setCallback={setCallback} />
        </div>
      </div>
      <CartItemsModal open={openModal} onClose={handleToggleModal} deleteItems={deleteItems} />
    </MainLayout>
  );
};

export default Cart;
