import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { ProductItem } from '../components/ProductItem';
import MainLayout from '../layouts/MainLayout';
import { getProducts } from '../store/actions/product';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <MainLayout title="Каталог">
      <Container>
        {/* <ul>
          {products.map((product) => (
            <li>
              {product.name}{' '}
              {product.images?.map((image) => (
                <img src={`http://localhost:5000/product/product-image/${image}`} alt="Product" />
              ))}
            </li>
          ))}
        </ul> */}
        <div className="catalog-list">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </MainLayout>
  );
};

export default Catalog;
