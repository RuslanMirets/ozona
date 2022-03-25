import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
  Box,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IProduct } from '../../types/product';

interface IProps {
  product: IProduct;
}

export const ProductItem: React.FC<IProps> = ({ product }) => {
  const { addToCart } = useActions();
  const { cartData } = useAppSelector((state) => state.cart);

  const handleAddToCart = () => {
    addToCart(product!, cartData);
  };

  return (
    <Card>
      <CardActionArea>
        <Link href={`/product/${product.id}`}>
          <a>
            <CardMedia
              sx={{ objectPosition: '0 30%' }}
              component="img"
              alt={product.images[0].url}
              height="200"
              image={product.images[0].url}
            />
          </a>
        </Link>
      </CardActionArea>
      <CardContent>
        <Typography sx={{ textTransform: 'capitalize' }} gutterBottom variant="h5" component="div">
          <Link href={`/product/${product.id}`}>
            <a>{product.title}</a>
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Typography variant="body1" color="crimson">
            {product.price} руб.
          </Typography>
          <Typography variant="body1" color="crimson">
            В наличии: {product.inStock}
          </Typography>
        </Box>
        <Typography
          sx={{ height: '100px', overflow: 'hidden' }}
          variant="body2"
          color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" fullWidth>
          <Link href={`/product/${product.id}`}>
            <a>Подробнее</a>
          </Link>
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={product.inStock > 0 ? false : true}
          onClick={handleAddToCart}>
          Купить
        </Button>
      </CardActions>
    </Card>
  );
};
