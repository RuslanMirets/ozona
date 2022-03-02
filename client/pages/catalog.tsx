import { Container } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { ProductItem } from '../components/ProductItem';
import MainLayout from '../layouts/MainLayout';
import { getProducts } from '../store/actions/product';
import { useAppSelector } from '../store/hooks';
import { wrapper } from '../store/store';

const Catalog: NextPage = () => {
  const { products } = useAppSelector((state) => state.product);

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

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getProducts());
  return { props: {} };
});

export default Catalog;
