import { GET_TABLE_DATA, GET_TYPE_LIST } from '../types';

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
    default:
      return state;
  }
};
