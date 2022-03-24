import { NextPage } from 'next';
import React from 'react';
import { ProductItem } from '../components/ProductItem';
import { useAppSelector } from '../hooks/useAppSelector';
import MainLayout from '../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../store';
import { fetchProducts } from '../store/actions-creators/product';

const Catalog: NextPage = () => {
  const { products } = useAppSelector((state) => state.product);

  return (
    <MainLayout title="Каталог">
      <div className="catalog">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(fetchProducts());
  return { props: {} };
});

export default Catalog;
