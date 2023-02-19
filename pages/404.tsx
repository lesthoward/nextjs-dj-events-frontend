import { Layout } from '@/components/Layout';
import Link from 'next/link';
import styles from '@/styles/404.module.css';
import * as Icons from 'react-icons/fa';

const NotFound = () => {
  return (
    <Layout
      title="Page Not Found"
      description="The page you are looking for cannot be found"
    >
      <div className={styles.error}>
        <h1>
          <Icons.FaExclamationTriangle />
          <span className={styles.error404Text}>404</span>
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
};

export default NotFound;
