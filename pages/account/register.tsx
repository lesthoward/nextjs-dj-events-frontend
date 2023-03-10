import * as Icons from 'react-icons/fa';
import styles from '@/styles/AuthForm.module.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Layout } from '@/components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onUsernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPasswordConfirmHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return toast.error('Passwords do not match!');
    }
  };

  return (
    <Layout title="User Registration" description="Register an account">
      <ToastContainer />
      <div className={styles.auth}>
        <h1>
          <Icons.FaUser />
          <span> Login</span>
        </h1>
        <form onSubmit={submitFormHandler}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={onUsernameHandler}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onEmailHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onPasswordHandler}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={onPasswordConfirmHandler}
            />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Already have an account? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
