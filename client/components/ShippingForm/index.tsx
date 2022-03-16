import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createOrder } from '../../store/actions/order';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cartSlice } from '../../store/slices/cart';
import { ShippingFormSchema } from '../../utils/validation';
import { FormField } from '../FormField';
import styles from './ShippingForm.module.scss';

interface IProps {
  total: number;
}

export const ShippingForm: React.FC<IProps> = ({ total }) => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  const { cartData } = useAppSelector((state) => state.cart);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(ShippingFormSchema),
  });

  const onSubmit = async (orderData: any) => {
    const data = {
      address: orderData.address,
      phone: orderData.phone,
      cart: cartData,
      total,
    };
    dispatch(createOrder(data));
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
