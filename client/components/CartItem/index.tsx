import { Button, IconButton } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './CartItem.module.scss';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IProduct } from '../../types/product';
import { CartActionTypes } from '../../types/cart';
import { CartItemModal } from '../Modals/CartItemModal';
import { useActions } from '../../hooks/useActions';

interface IProps {
  item: IProduct;
  increase: Function;
  decrease: Function;
}

export const CartItem: React.FC<IProps> = ({ item, increase, decrease }) => {
  const { deleteItem } = useActions();

  const handleIncrease = () => {
    increase(item.id);
  };
  const handleDecrease = () => {
    decrease(item.id);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className={styles.root}>
      <Link href={`/product/${item.id}`}>
        <a>
          <img src={item.images[0].url} alt={item.images[0].url} />
        </a>
      </Link>
      <div className={styles.info}>
        <h5 className={styles.title}>
          <Link href={`/product/${item.id}`}>
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
        <IconButton onClick={handleToggleModal}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
      <CartItemModal
        deleteItem={deleteItem}
        open={openModal}
        onClose={handleToggleModal}
        item={item}
      />
    </div>
  );
};
