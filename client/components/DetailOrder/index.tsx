import React from 'react';
import styles from './DetailOrder.module.scss';
import { Alert, Button } from '@mui/material';
import Link from 'next/link';
import { IOrder } from '../../types/order';
import { IUser } from '../../types/user';

interface IProps {
  order: IOrder;
  user: IUser;
  deliveredOrder: Function;
}

export const DetailOrder: React.FC<IProps> = ({ order, user, deliveredOrder }) => {
  const handleDelivered = (order: IOrder) => {
    deliveredOrder(order.id);
  };

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <h2>Заказ № {order.id}</h2>
        <div className={styles.shipping}>
          <h4>Доставка</h4>
          <p>Имя: {order.user?.[0].name}</p>
          <p>Email: {order.user?.[0].email}</p>
          <p>Адрес: {order.address}</p>
          <p>Телефон: {order.phone}</p>
          <Alert
            classes={{ message: styles.message }}
            severity={order.delivered ? 'success' : 'error'}
            style={{ display: 'flex', alignItems: 'center' }}>
            {order.delivered ? `Доставлен ${order.updatedAt}` : 'Не доставлен'}
            {user.role?.[0].value === 'ADMIN' && !order.delivered && (
              <Button variant="outlined" onClick={() => handleDelivered(order!)}>
                Отметить как доставленный
              </Button>
            )}
          </Alert>
        </div>
      </div>
      <div className={styles.orderItems}>
        <h4>Товары для заказа</h4>
        <div>
          {order.cart?.map((item) => (
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
        <div className={styles.total}>Всего: {order.total} руб.</div>
      </div>
    </div>
  );
};
