import {SET_NEWS} from '../utils/const';

const initialState = {
  news: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEWS: {
      return {
        ...state,
        news: [...state.news, ...action.data],
      };
    }

    default: {
      return state;
    }
  }
}
