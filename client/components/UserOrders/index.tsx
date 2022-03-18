import React from 'react';
import { IOrder } from '../../interfaces/order';
import styles from './UserOrders.module.scss';

interface IParams {
  orders: IOrder[];
}

export const UserOrders: React.FC<IParams> = ({ orders }) => {
  return (
    <div className={styles.orders}>
      <h3>Заказы</h3>
      <div>
        {orders.map((order) => (
          <div>{order.phone}</div>
        ))}
      </div>
    </div>
  );
};
