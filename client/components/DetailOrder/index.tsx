import React from 'react';
import styles from './DetailOrder.module.scss';
import { Alert } from '@mui/material';
import Link from 'next/link';
import { IOrder } from '../../types/order';

interface IProps {
  order: IOrder | null;
}

export const DetailOrder: React.FC<IProps> = ({ order }) => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <h2>Заказ № {order?.id}</h2>
        <div className={styles.shipping}>
          <h4>Доставка</h4>
          <p>Имя: {order?.user?.[0].name}</p>
          <p>Email: {order?.user?.[0].email}</p>
          <p>Адрес: {order?.address}</p>
          <p>Телефон: {order?.phone}</p>
          <Alert severity={order?.delivered ? 'success' : 'error'}>
            {order?.delivered ? `Доставлен ${order.updatedAt}` : 'Не доставлен'}
          </Alert>
        </div>
      </div>
      <div className={styles.orderItems}>
        <h4>Товары для заказа</h4>
        <div>
          {order?.cart.map((item) => (
            <div className={styles.item} key={item.id}>
              <Link href={`/product/${item.id}`}>
                <a>
                  <img src={item.images[0].url} alt={item.images[0].url} />
                </a>
              </Link>
              <h5>
                <Link href={`/product/${item.id}`}>
                  <a>{item.title}</a>
                </Link>
              </h5>
              <span>
                {item.quantity} x {item.price} руб. = {item.quantity * item.price} руб.
              </span>
            </div>
          ))}
        </div>
        <div className={styles.total}>Всего: {order?.total} руб.</div>
      </div>
    </div>
  );
};
