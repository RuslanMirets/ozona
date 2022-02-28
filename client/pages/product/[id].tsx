import { Container } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { IProduct } from '../../models/product';

const Product: NextPage = ({ serverProduct }) => {
  const [product, setProduct] = useState<IProduct>(serverProduct);

  return (
    <MainLayout>
      <Container>
        <h1>Продукт</h1>
        <div>{product?.name}</div>
        {product.images?.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/product/product-image/${image}`}
            alt="Product"
          />
        ))}
      </Container>
    </MainLayout>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get('http://localhost:5000/product/' + params?.id);
  return {
    props: {
      serverProduct: response.data,
    },
  };
};
