import { Button } from '@mui/material';
import React, { useState } from 'react';
import { IProduct } from '../../interfaces/product';
import { addToCart } from '../../store/actions/cart';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './ProductDetail.module.scss';

interface IProps {
  product: IProduct | null;
}

export const ProductDetail: React.FC<IProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { cartData } = useAppSelector((state) => state.cart);

  const [tab, setTab] = useState(0);

  const isActive = (index: any) => {
    if (tab === index) return styles.active;
    return '';
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product!, cartData));
  };

  return (
    <div className={styles.root}>
      <div className={styles.images}>
        <img src={product?.images[tab].url} alt={product?.images[tab].url} />
        <div className={styles.thumbnail}>
          {product?.images.map((image, index) => (
            <img
              className={`${isActive(index)}`}
              key={index}
              src={image.url}
              alt={image.url}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <h1>{product?.title}</h1>
        <div className={styles.price}>{product?.price} руб.</div>
        <div className={styles.count}>
          {product!.inStock > 0 ? (
            <div>В наличии: {product?.inStock}</div>
          ) : (
            <div>Нет в наличии</div>
          )}
          <div>Продано: {product?.sold}</div>
        </div>
        <div className={styles.description}>{product?.description}</div>
        <div>{product?.content}</div>
        <Button
          variant="contained"
          disabled={product!.inStock > 0 ? false : true}
          onClick={handleAddToCart}>
          Купить
        </Button>
      </div>
    </div>
  );
};
