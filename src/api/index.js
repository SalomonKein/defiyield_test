import axios from 'axios';

export async function getNews(page = 1) {
  const {data} = await axios.get(`https://api.hnpwa.com/v0/news/${page}.json`);
  return data;
}
