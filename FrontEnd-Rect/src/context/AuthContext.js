import { useToast } from '@chakra-ui/react';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../util/toasts';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'));

  const login = async (username, password) => {
    const request = await fetch('/api/v1/auth/login', {
      headers: {
        Authorization: 'Basic ' + window.btoa(username + ':' + password),
      },
      method: 'POST',
    });
    const data = await request.json();
    if (request.status === 200) {
      toast(successToast(data.message));
      setIsLogged(1);
      localStorage.setItem('isLogged', 1);
      navigate('/');
    } else {
      toast(errorToast(data.message));
    }
  };

  const register = async (username, phone, password, password2) => {
    if (password != password2) {
      toast(errorToast('Passowrd do not match'));
      return;
    }
    const bodyData = JSON.stringify({ phone, password, username });

    const request = await fetch('/api/v1/auth/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: bodyData,
    });
    const data = await request.json();
    if (request.status === 201) {
      toast(successToast(data.message));
      navigate('/login');
    } else {
      toast(errorToast(data.message));
    }
  };

  const logout = async () => {
    const request = await fetch('/api/v1/auth/logout');

    if (request.status === 204) {
      toast(successToast('Logout successfully'));
      setIsLogged(0);
      localStorage.setItem('isLogged', 0);
      navigate('/login');
    }
  };
  return (
    <AuthContext.Provider value={{ login, register, isLogged, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
