import axios from 'axios';
import { API_URLS, LOCAL_STORAGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  try {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const headers = {
      'content-tye': 'application/json',
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };

    config.url = url;

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await axios(config);
    const data = await response.data;
    // console.log(data);
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.log(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};
