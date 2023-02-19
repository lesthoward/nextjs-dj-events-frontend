import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  title: string | false;
  description: string | false;
  keywords?: string;
  children: React.ReactNode;
}

export const Layout = ({
  children,
  title,
  description,
  keywords,
}: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title || 'DJ Events | Find the hottest parties '}</title>
        <meta
          name="description"
          content={
            description || '"Find the latest DJ and other musical events"'
          }
        />
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};
