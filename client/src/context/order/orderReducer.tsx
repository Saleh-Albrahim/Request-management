import { GET_TABLE_DATA, UPDATE_SELECTED_TYPE, GET_TYPE_LIST } from '../types';

export default (state: any, action: any) => {
  switch (action.type) {
    case GET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    case UPDATE_SELECTED_TYPE:
      return {
        ...state,
        selectedType: action.payload,
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
