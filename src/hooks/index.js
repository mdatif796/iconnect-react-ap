import { useContext, useEffect, useState } from 'react';
import { editUser, fetchUserFriends, logIn as userLogin, signUp } from '../api';
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

  // const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
      console.log('userToken: ', userToken);

      if (userToken) {
        const user = jwt(userToken);
        console.log('user: ', user);
        const response = await fetchUserFriends();
        console.log('response: ', response);

        let friendships = [];

        if (response.success) {
          friendships = response.data.friends;
        }

        setUser({
          ...user,
          friendships,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    const fetchedUser = response.data.user;
    console.log('response: ', response);
    if (response.success) {
      const getUserFriends = async () => {
        const response = await fetchUserFriends();
        if (response.success) {
          fetchedUser.friendships = response.data.friends;
        }
      };

      setItemToLocalStorage(LOCAL_STORAGE_TOKEN_KEY, response.data.token);
      getUserFriends();
      setUser(fetchedUser);
      console.log('fetchedUser: ', fetchedUser);
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

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friendships: [...user.friendships, friend],
      });
      return;
    }

    const newFriends = user.friendships.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );

    setUser({
      ...user,
      friendships: newFriends,
    });
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    edituser,
    updateUserFriends,
  };
};
