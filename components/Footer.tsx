import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; DJ Events {new Date().getFullYear()}. </p>
      <Link target="_blank" href="https://www.linkedin.com/in/lesthoward/">
        Click to get details about the developer
      </Link>
    </footer>
  );
};
