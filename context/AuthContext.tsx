import { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '../config';

export const AuthContext = createContext<{
  user: any;
  error: string;
  register: (props: RegisterProps) => void;
  login: (props: LoginProps) => void;
  logout: () => void;
  checkUserLoggedIn: (props: any) => void;
  handleError: (state: string) => void;
}>({} as any);

interface AuthProps {
  children: React.ReactNode;
}

interface RegisterProps {
  username: string;
  email: string;
  password: string;
}
interface LoginProps {
  email: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>('');
  const router = useRouter();

  // Register user
  const register = async (props: RegisterProps) => {
    console.log('register', props);
  };
  // Login user
  const login = async (props: LoginProps) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: props.email.trim(),
        password: props.password.trim(),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      const errorMessage = data.message as string;
      const capitalizedMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
      setError(capitalizedMessage);
    }
  };
  // Logout user
  const logout = async () => {
    console.log('logout');
  };
  // Check if user is logged in
  const checkUserLoggedIn = async (props: any) => {
    console.log('checkUserLoggedIn', props);
  };

  const handleError = (state: string) => {
    setError(state);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        checkUserLoggedIn,
        handleError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
