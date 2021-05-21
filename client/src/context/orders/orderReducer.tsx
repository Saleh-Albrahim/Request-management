import { GET_TABLE_DATA, GET_TYPE_LIST, SET_TYPE } from '../types';

export default (state: any, action: any) => {
  switch (action.type) {
    case GET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    case GET_TYPE_LIST:
      return {
        ...state,
        typeList: action.payload,
      };
    case SET_TYPE:
      return {
        ...state,
        selectedType: action.payload,
      };
    default:
      return state;
  }
};
