import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { ProductDetail } from '../../components/ProductDetail';
import { useAppSelector } from '../../hooks/useAppSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchProductDetail } from '../../store/actions-creators/product';

interface IParams extends ParsedUrlQuery {
  id: string;
}

const Product: NextPage = () => {
  const { productDetail } = useAppSelector((state) => state.product);

  return (
    <MainLayout title={productDetail?.title}>
      <ProductDetail product={productDetail!} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params as IParams;
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(fetchProductDetail(id));
  return { props: {} };
});

export default Product;
