import { Button, CardActionArea } from '@mui/material';
import React, { useState } from 'react';
import { IProduct } from '../../types/product';
import styles from './ProductDetail.module.scss';
import classnames from 'classnames';

interface IProps {
  product: IProduct;
}

export const ProductDetail: React.FC<IProps> = ({ product }) => {
  const [tab, setTab] = useState(0);

  const isActive = (index: any) => {
    if (tab === index) return styles.active;
    return '';
  };

  return (
    <div className={styles.root}>
      <div className={styles.images}>
        <img src={product?.images[tab].url} alt={product?.images[tab].url} />
        <div className={styles.thumbnail}>
          {product?.images.map((image, index) => (
            <CardActionArea
              className={classnames(styles.thumbnailImage, isActive(index))}
              key={index}
              onClick={() => setTab(index)}>
              <img src={image.url} alt={image.url} />
            </CardActionArea>
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
        <Button variant="contained" disabled={product!.inStock > 0 ? false : true}>
          Купить
        </Button>
      </div>
    </div>
  );
};
