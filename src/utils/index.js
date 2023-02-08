export * from './constants';

export const setItemToLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('Cant set to local storage');
  }

  localStorage.setItem(
    key,
    typeof value !== 'string' ? JSON.stringify(value) : value
  );
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Cant get item from local storage');
  }

  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Cant remove from local storage');
  }

  localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
};
