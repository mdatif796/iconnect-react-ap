import { useContext, useState } from 'react';
import { logIn as userLogin } from '../api';
import { AuthContext } from '../providers/AuthProvider';
import {
  LOCAL_STORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    console.log('response: ', response);
    if (response.success) {
      setUser(response.data.user);
      setItemToLocalStorage(LOCAL_STORAGE_TOKEN_KEY, response.data.token);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};
