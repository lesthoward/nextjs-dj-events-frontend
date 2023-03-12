import 'react-toastify/dist/ReactToastify.css';
import * as Icons from 'react-icons/fa';
import styles from '@/styles/AuthForm.module.css';
import Link from 'next/link';
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, handleError } = useContext(AuthContext);

  useEffect(() => {
    if(error) {
      toast.error(error);
      handleError('');
    }
  }, [error])

  const onEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      email,
      password,
    })                                                                      
  };

  return (
    <Layout title="User Login" description="Login to your account">
      <ToastContainer />
      <div className={styles.auth}>
        <h1>
          <Icons.FaUser />
          <span> Login</span>
        </h1>
        <form onSubmit={submitFormHandler}>
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

          <input type="submit" value="Login" className='btn' />
        </form>

        <p>
          Don't have an account? <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
