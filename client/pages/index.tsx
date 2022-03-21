import { NextPage } from 'next';
import React from 'react';
import { ProductItem } from '../components/ProductItem';
import MainLayout from '../layouts/MainLayout';
import { wrapper } from '../store';
import { fetchProducts } from '../store/actions/product';
import { useAppSelector } from '../store/hooks';

const Home: NextPage = () => {
  const { products } = useAppSelector((state) => state.product);

  return (
    <MainLayout>
      {products.length === 0 ? (
        <h1>Товары отсутствуют</h1>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(fetchProducts());
  return { props: {} };
});

export default Home;
