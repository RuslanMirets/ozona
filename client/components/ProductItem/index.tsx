import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { IProduct } from '../../interfaces/product';

interface IProps {
  product: IProduct;
}

export const ProductItem: React.FC<IProps> = ({ product }) => {
  return (
    <Card>
      <Link href={`/product/${product._id}`}>
        <a style={{ display: 'block', height: 250 }}>
          <CardMedia
            sx={{ objectPosition: 'top' }}
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
            В наличии: {product.inStock}
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
        <Button variant="contained" fullWidth>
          Купить
        </Button>
      </CardActions>
    </Card>
  );
};
