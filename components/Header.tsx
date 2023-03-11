import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import * as Icons from 'react-icons/fa';
import { useContext } from 'react';
import { Search } from './Search';
import { AuthContext } from '@/context/AuthContext';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href="/events/add">Add Event</Link>
              </li>
              <li>
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <button className="btn-secondary" onClick={logoutHandler}>
                  <Icons.FaSignOutAlt />
                  <span> Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/account/login" className="btn-secondary btn-icon">
                <Icons.FaSignInAlt />
                <span> Login</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
