import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { IProduct } from '../../interfaces/product';
import { addToCart } from '../../store/actions/cart';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IProps {
  product: IProduct;
}

export const ProductItem: React.FC<IProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { cartData } = useAppSelector((state) => state.cart);

  const handleAddToCart = () => {
    dispatch(addToCart(product!, cartData));
  };

  return (
    <Card>
      <Link href={`/product/${product._id}`}>
        <a style={{ display: 'block', height: 250 }}>
          <CardMedia
            sx={{ objectPosition: '0 30%' }}
            component="img"
            image={product.images[0].url}
            alt={product.images[0].url}
          />
        </a>
      </Link>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ textTransform: 'capitalize' }}>
          {product.title}
        </Typography>
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" color="crimson">
            {product.price} руб.
          </Typography>
          <Typography variant="body1" color="crimson">
            {product.inStock > 0 ? (
              <div>В наличии: {product.inStock}</div>
            ) : (
              <div>Нет в наличии</div>
            )}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" fullWidth>
          <Link href={`/product/${product._id}`}>
            <a>Подробнее</a>
          </Link>
        </Button>
        <Button
          variant="contained"
          disabled={product.inStock > 0 ? false : true}
          fullWidth
          onClick={handleAddToCart}>
          Купить
        </Button>
      </CardActions>
    </Card>
  );
};
