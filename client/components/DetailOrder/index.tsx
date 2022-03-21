import React from 'react';
import styles from './DetailOrder.module.scss';
import { Alert, Button } from '@mui/material';
import { IOrder } from '../../interfaces/order';
import Link from 'next/link';
import { IUser } from '../../interfaces/user';

interface IProps {
  order: IOrder | null;
  userData: IUser | null;
}

export const DetailOrder: React.FC<IProps> = ({ order, userData }) => {
  const handleDelivered = (id: string) => {};

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <h2>Заказ № {order?._id}</h2>
        <div className={styles.shipping}>
          <h4>Доставка</h4>
          <p>Имя: {order?.user.name}</p>
          <p>Email: {order?.user.email}</p>
          <p>Адрес: {order?.address}</p>
          <p>Телефон: {order?.phone}</p>
          <Alert
            severity={order?.delivered ? 'success' : 'error'}
            style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: '1 1 auto',
                justifyContent: 'space-between',
              }}>
              {order?.delivered ? `Доставлен ${order.updatedAt}` : 'Не доставлен'}
              {userData?.role === 'admin' && !order?.delivered && (
                <Button onClick={() => handleDelivered(order!._id)}>
                  Отметить как доставленное
                </Button>
              )}
            </div>
          </Alert>
        </div>
      </div>
      <div className={styles.orderItems}>
        <h4>Товары для заказа</h4>
        <div>
          {order?.cart.map((item) => (
            <div className={styles.item} key={item._id}>
              <Link href={`/product/${item._id}`}>
                <a>
                  <img src={item.images[0].url} alt={item.images[0].url} />
                </a>
              </Link>
              <h5>
                <Link href={`/product/${item._id}`}>
                  <a>{item.title}</a>
                </Link>
              </h5>
              <span>
                {item.quantity} x {item.price} руб. = {item.quantity * item.price} руб.
              </span>
            </div>
          ))}
        </div>
        {userData?.role !== 'admin' && (
          <div className={styles.total}>Всего: {order?.total} руб.</div>
        )}
      </div>
    </div>
  );
};
