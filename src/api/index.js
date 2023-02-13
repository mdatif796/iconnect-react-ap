import axios from 'axios';
import { API_URLS, getFormBody, LOCAL_STORAGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  try {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const headers = {
      'content-type': 'x-www-form-urlencoded',
    };

    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    const config = {
      ...customConfig,
      headers,
    };

    config.url = url;

    if (body) {
      config.body = getFormBody(body);
    }

    const response = await axios(config);
    console.log('response: ', response);
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

export const getPosts = (page = 1, limit = 20) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const logIn = async (email, password) => {
  // return customFetch(API_URLS.login(), {
  //   method: 'POST',
  //   body: { email, password },
  // });
  const response = fetch(API_URLS.login(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': `Bearer ${token}` // Remove Auth if not required
    },
    body: getFormBody({ email: email, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // your response in json
      console.log(data);
      return data;
    });
  return response;
};

export const signUp = async (email, name, password, confirm_password) => {
  // return customFetch(API_URLS.signup(), {
  //   method: 'POST',
  //   body: { email, name, password, confirm_password },
  // });

  const response = fetch(API_URLS.signup(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': `Bearer ${token}` // Remove Auth if not required
    },
    body: getFormBody({
      email: email,
      name: name,
      password: password,
      confirm_password: confirm_password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // your response in json
      console.log(data);
      return data;
    });
  return response;
};

export const editUser = async (userId, password, confirm_password, name) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const response = fetch(API_URLS.editUser(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
    body: getFormBody({
      id: userId,
      name: name,
      password: password,
      confirm_password: confirm_password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // your response in json
      console.log(data);
      return data;
    });
  return response;
};

export const userProfileInfo = async (userId) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const response = fetch(API_URLS.userInfo(userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // your response in json
      console.log(data);
      return data;
    });
  return response;
};

export const createFriendship = async (userId) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const response = fetch(API_URLS.createFriendship(userId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // your response in json
      console.log(data);
      return data;
    });
  return response;
};

export const fetchUserFriends = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const response = fetch(API_URLS.friends(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // your response in json
      console.log(data);
      return data;
    });
  return response;
};

export const removeFriendApi = async (userId) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const response = fetch(API_URLS.removeFriend(userId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // your response in json
      console.log(data);
      return data;
    });
  return response;
};
