// @ts-nocheck
import React, { useReducer } from 'react';
import orderContext from './orderContext';
import OrderReducer from './orderReducer';
import { GET_TABLE_DATA, UPDATE_SELECTED_TYPE, GET_TYPE_LIST } from '../types';

type Props = {
  children: React.ReactNode;
};

const OrderState: React.FC = ({ children }: Props) => {
  const initialState = {
    tableData: [{}],
    selectedType: '',
    typeList: [],
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Get Table Data
  const updateTableData = async (type) => {
    const response = await fetch(`/api/v1/orders?type=${type}`);

    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: GET_TABLE_DATA,
        payload: data,
      });
    }
  };

  // GET Type List
  const updateTypeList = async () => {
    const response = await fetch('/api/v1/orders/type');

    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: GET_TYPE_LIST,
        payload: data,
      });
    }
  };

  return (
    <orderContext.Provider
      value={{
        tableData: state.tableData,
        selectedType: state.selectedType,
        typeList: state.typeList,
        updateTableData,
        updateTypeList,
      }}
    >
      {children}
    </orderContext.Provider>
  );
};

export default OrderState;
