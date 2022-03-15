import { Button, IconButton } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { IProduct } from '../../interfaces/product';
import styles from './CartItem.module.scss';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { DECREMENT, INCREMENT } from '../../store/slices/cart';

interface IProps {
  item: IProduct;
  dispatch: any;
  cartData: any;
}

export const CartItem: React.FC<IProps> = ({ item, dispatch, cartData }) => {
  const handleDecrease = () => {
    dispatch(DECREMENT(item._id));
  };
  const handleIncrease = () => {
    dispatch(INCREMENT(item._id));
  };

  return (
    <div className={styles.root}>
      <Link href={`/product/${item._id}`}>
        <a>
          <img src={item.images[0].url} alt={item.images[0].url} />
        </a>
      </Link>
      <div className={styles.info}>
        <h5 className={styles.title}>
          <Link href={`/product/${item._id}`}>
            <a>{item.title}</a>
          </Link>
        </h5>
        <div className={styles.price}>{item.price} руб.</div>
        <div className={styles.stock}>
          {item.inStock > 0 ? `В наличии: ${item.inStock}` : 'Нет в наличии'}
        </div>
      </div>
      <div className={styles.actions}>
        <Button
          variant="outlined"
          onClick={handleDecrease}
          disabled={item.quantity === 1 ? true : false}>
          -
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="outlined"
          onClick={handleIncrease}
          disabled={item.quantity === item.inStock ? true : false}>
          +
        </Button>
      </div>
      <div className={styles.remove}>
        <IconButton>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};
