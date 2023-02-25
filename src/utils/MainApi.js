import { baseUrl } from './constants';

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Error: ${res.status}`);
  }
};

const getCurrentUser = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkRes);
};

const createUser = (email, password, name) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ email, password, name }),
  }).then(checkRes);
};

const loginUser = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkRes)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
};

const getArticles = () => {
  return fetch(`${baseUrl}/articles`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkRes);
};

const deleteArticle = (id) => {
  return fetch(`${baseUrl}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkRes);
};

const createArticle = (keyword, title, text, date, source, link, image) => {
  return fetch(`${baseUrl}/articles`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ keyword, title, text, date, source, link, image }),
  }).then(checkRes);
};

export {
  getCurrentUser,
  createUser,
  loginUser,
  getArticles,
  deleteArticle,
  createArticle,
};
