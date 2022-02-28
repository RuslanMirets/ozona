import { Container } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { ProductItem } from '../components/ProductItem';
import MainLayout from '../layouts/MainLayout';
import { getProducts } from '../store/actions/product';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Catalog: NextPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <MainLayout title="Каталог">
      <Container>
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
