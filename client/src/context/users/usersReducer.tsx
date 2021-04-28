import { GET_USERS_LIST, SET_USER } from '../types';

export default (state: any, action: any) => {
  switch (action.type) {
    case GET_USERS_LIST:
      return {
        ...state,
        usersList: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
