import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '../config';

export const AuthContext = createContext<{
  user: any;
  error: string;
  register: (props: RegisterProps) => void;
  login: (props: LoginProps) => void;
  logout: () => void;
  checkUserLoggedIn: () => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Register user
  const register = async (props: RegisterProps) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      const errorMessage = data.message as string;
      const capitalizedMessage =
        errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
      setError(capitalizedMessage);
    }
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
      router.push('/account/dashboard');
    } else {
      const errorMessage = data.message as string;
      const capitalizedMessage =
        errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
      setError(capitalizedMessage);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });
    if (res.ok) {
      await checkUserLoggedIn();
      router.push('/');
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
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
