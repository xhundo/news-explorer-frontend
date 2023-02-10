const apiKey = '5a6b2a43ab6041619415e96fcaf5eedd';
const baseUrl = 'http://localhost:3002';

const currentDate = new Date().toLocaleDateString();
const previousDate = new Date(
  Date.now() - 7 * 24 * 60 * 60 * 1000,
).toLocaleDateString();

export { apiKey, currentDate, previousDate, baseUrl };
