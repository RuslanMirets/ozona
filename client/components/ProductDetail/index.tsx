import { Button, CardActionArea, Typography } from '@mui/material';
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
        <Typography variant="h4" component="h4">
          {product?.title}
        </Typography>
        <Typography className={styles.price} variant="h5" component="div">
          {product?.price} руб.
        </Typography>
        <div className={styles.count}>
          {product!.inStock > 0 ? (
            <Typography variant="subtitle1" component="div">
              В наличии: {product?.inStock}
            </Typography>
          ) : (
            <Typography variant="subtitle1" component="div">
              Нет в наличии
            </Typography>
          )}
          <div>Продано: {product?.sold}</div>
        </div>
        <Typography className={styles.description} variant="body1" component="div">
          {product?.description}
        </Typography>
        <Button variant="contained" disabled={product!.inStock > 0 ? false : true}>
          Купить
        </Button>
      </div>
    </div>
  );
};
