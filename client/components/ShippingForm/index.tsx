import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { CartActionTypes } from '../../types/cart';
import { NotifyActionTypes } from '../../types/notify';
import { getAPI } from '../../utils/fetchData';
import { ShippingFormSchema } from '../../utils/validations';
import { FormField } from '../FormField';
import styles from './ShippingForm.module.scss';

interface IProps {
  total: number;
  callback: any;
  setCallback: any;
}

export const ShippingForm: React.FC<IProps> = ({ total, callback, setCallback }) => {
  const dispatch = useDispatch();
  const { createOrder } = useActions();
  const { userData } = useAppSelector((state) => state.user);
  const { cartData } = useAppSelector((state) => state.cart);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(ShippingFormSchema),
  });

  const onSubmit = async (orderData: any) => {
    let newCart = [];
    for (const item of cartData) {
      const response = await getAPI(`product/${item.id}`);
      const { inStock } = response.data;
      if (inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }
    if (newCart.length < cartData.length) {
      setCallback(!callback);
      return dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: 'Товара нет на складе или его недостаточное количество' },
      });
    }
    const newOrder = {
      id: orderData._id,
      address: orderData.address,
      phone: orderData.phone,
      cart: cartData,
      total,
    };
    createOrder(newOrder);
    dispatch({ type: CartActionTypes.ADD_TO_CART, payload: [] });
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField type="text" label="Адрес" name="address" />
        <FormField type="tel" label="Номер телефона" name="phone" />
        <div className={styles.total}>
          Всего: <span>{total} р.</span>
        </div>
        {userData ? (
          <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting}>
            Продолжить оплату
          </Button>
        ) : (
          <Link href="/login">
            <a className={styles.btn}>
              <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting}>
                Продолжить оплату
              </Button>
            </a>
          </Link>
        )}
      </form>
    </FormProvider>
  );
};
