import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { ProductDetail } from '../../components/ProductDetail';
import MainLayout from '../../layouts/MainLayout';
import { wrapper } from '../../store';
import { fetchProduct } from '../../store/actions/product';
import { useAppSelector } from '../../store/hooks';

interface IParams extends ParsedUrlQuery {
  id: string;
}

const Product: NextPage = () => {
  const { product } = useAppSelector((state) => state.product);

  return (
    <MainLayout title={product?.title}>
      <ProductDetail product={product} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params as IParams;
  await store.dispatch(fetchProduct(id));
  return { props: {} };
});

export default Product;
