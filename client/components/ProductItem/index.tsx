import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { IProduct } from '../../models/product';
import styles from './ProductItem.module.scss';

interface ProductItemProps {
  product: IProduct;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      {/* <Link href={`product/${product.id}`}>
        <a>
          <img
            src={
              product.images[0]
                ? `http://localhost:5000/product/product-image/${product.images[0]}`
                : `/assets/images/404-img.jpg`
            }
            alt={product.name}
          />
        </a>
      </Link> */}
      <div className={styles.body}>
        <h5 className={styles.name}>{product.name}</h5>
        <div className={styles.price}>{product.price} руб.</div>
        <Link href={`/product/${product.id}`}>
          <a>
            <Button variant="contained">Подробнее</Button>
          </a>
        </Link>
      </div>
    </div>
  );
};
