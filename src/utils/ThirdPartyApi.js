import { apiKey, currentDate, previousDate } from './constants';

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  } else if (res.status === 400) {
    throw new Error(`Search not found`);
  } else if (res.status === 429) {
    throw new Error(`An error has occurred on the server`);
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const searchNews = (search) => {
  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${search}&from=${previousDate}&to=${currentDate}&pageSize=100&apiKey=${apiKey}`,
    {
      headers: {
        'Access-Control-Request-Headers':
          'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      },
    },
  ).then(checkRes);
};

export { searchNews };
