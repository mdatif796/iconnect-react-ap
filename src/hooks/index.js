import { useContext, useEffect, useState } from 'react';
import { editUser, logIn as userLogin, signUp } from '../api';
import { AuthContext } from '../providers/AuthProvider';

import jwt from 'jwt-decode';

import {
  getItemFromLocalStorage,
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

  useEffect(() => {
    const token = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      const decodedUser = jwt(token);
      console.log('decodedUser: ', decodedUser);
      setUser(decodedUser);
    }
    setLoading(false);
  }, []);

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

  const signup = async (email, name, password, confirm_password) => {
    const response = await signUp(email, name, password, confirm_password);
    if (response.success) {
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

  const edituser = async (userId, password, confirm_password, name) => {
    const response = await editUser(userId, password, confirm_password, name);
    if (response.success) {
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
    signup,
    edituser,
  };
};
