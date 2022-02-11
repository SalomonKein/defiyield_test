import {SET_NEWS} from '../utils/const';

export function setNews(news) {
  return {
    type: SET_NEWS,
    data: news,
  };
}
