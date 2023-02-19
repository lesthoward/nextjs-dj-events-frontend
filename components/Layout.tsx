import Head from 'next/head';
import styles from '../styles/Layout.module.css';

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

      <div className={styles.container}>{children}</div>
    </div>
  );
};
