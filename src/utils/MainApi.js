class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getCurrentUser = () => {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  };

  createUser = (email, password, name) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password, name }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Error: ${res.status}`);
    });
  };

  loginUser = (email, password) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          return data;
        }
      });
  };

  getArticles = () => {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Error: ${res.status}`);
      }
    });
  };

  deleteArticle = (id) => {
    return fetch(`${this.baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  };

  createArticle = (keyword, title, text, date, source, link, image) => {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ keyword, title, text, date, source, link, image }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Error: ${res.status}`);
      }
    });
  };
}
export default Api;
