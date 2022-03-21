import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createOrder } from '../../store/actions/order';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { alertSlice } from '../../store/slices/alert';
import { cartSlice } from '../../store/slices/cart';
import { getAPI } from '../../utils/fetchData';
import { ShippingFormSchema } from '../../utils/validation';
import { FormField } from '../FormField';
import styles from './ShippingForm.module.scss';

interface IProps {
  total: number;
  callback: any;
  setCallback: any;
}

export const ShippingForm: React.FC<IProps> = ({ total, callback, setCallback }) => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  const { cartData } = useAppSelector((state) => state.cart);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(ShippingFormSchema),
  });

  const onSubmit = async (orderData: any) => {
    let newCart = [];
    for (const item of cartData) {
      const response = await getAPI(`product/${item._id}`);
      const { inStock } = response.data;
      if (inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }
    if (newCart.length < cartData.length) {
      setCallback(!callback);
      return dispatch(
        alertSlice.actions.errors('Товара нет на складе или его недостаточное количество'),
      );
    }
    const newOrder = {
      id: orderData._id,
      address: orderData.address,
      phone: orderData.phone,
      cart: cartData,
      total,
    };
    dispatch(createOrder(newOrder as any));
    dispatch(cartSlice.actions.addToCart([]));
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
          <Button
            type="submit"
            variant="contained"
            disabled={!methods.formState.isValid || methods.formState.isSubmitting}>
            Заказать
          </Button>
        ) : (
          <Link href="/login">
            <a className={styles.btn}>
              <Button
                type="submit"
                variant="contained"
                disabled={!methods.formState.isValid || methods.formState.isSubmitting}>
                Заказать
              </Button>
            </a>
          </Link>
        )}
      </form>
    </FormProvider>
  );
};
