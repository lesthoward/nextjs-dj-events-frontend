import { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '../config';

export const AuthContext = createContext<{
  user: any;
  error: boolean;
  register: (props: registerProps) => void;
  login: (props: loginProps) => void;
  logout: () => void;
  checkUserLoggedIn: (props: any) => void;
}>({} as any);

interface AuthProps {
  children: React.ReactNode;
}

interface registerProps {
  username: string;
  email: string;
  password: string;
}
interface loginProps {
  email: string;
  password: string;
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  // Register user
  const register = async (props: registerProps) => {
    console.log('register', props);
  };
  // Login user
  const login = async (props: loginProps) => {
    console.log('login', props);
  };
  // Logout user
  const logout = async () => {
    console.log('logout');
  };
  // Check if user is logged in
  const checkUserLoggedIn = async (props: any) => {
    console.log('checkUserLoggedIn', props);
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
