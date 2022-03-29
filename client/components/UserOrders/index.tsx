import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { IOrder } from '../../types/order';
import styles from './UserOrders.module.scss';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface IParams {
  orders: IOrder[];
}

export const UserOrders: React.FC<IParams> = ({ orders }) => {
  return (
    <div className={styles.orders}>
      <h3>Заказы</h3>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Доставлено</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Link href={`/order/${order.id}`}>
                    <a>
                      <Button>{order.id}</Button>
                    </a>
                  </Link>
                </TableCell>
                <TableCell>{new Date(order.createdAt!).toLocaleDateString()}</TableCell>
                <TableCell>{order.total} руб.</TableCell>
                <TableCell>
                  {order.delivered ? (
                    <CheckCircleOutlinedIcon color="success" />
                  ) : (
                    <CancelOutlinedIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/order/${order.id}`}>
                    <a>
                      <Button variant="outlined">Подробнее</Button>
                    </a>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
