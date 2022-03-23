import { Container } from '@mui/material';
import Head from 'next/head';
import { Header } from '../components/Header';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>{title || 'OZONA - интернет-магазин'}</title>
        <meta name="description" content={`Онлайн магазин. ` + description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || 'Магазин товаров'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <Header />
        <main className="main">
          <Container>{children}</Container>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
