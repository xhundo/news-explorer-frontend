const apiKey = '2abb8e9981ee44998ef888ce33672c65';

const currentDate = new Date().toLocaleDateString();
const previousDate = new Date(
  Date.now() - 7 * 24 * 60 * 60 * 1000,
).toLocaleDateString();

export { apiKey, currentDate, previousDate };
