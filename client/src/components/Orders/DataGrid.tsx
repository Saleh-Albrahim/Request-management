import React, { useState } from 'react';
import { Box, Flex, Grid, IconButton, Text, Button } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon, AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import usePagination from '../../hooks/userPagination';
import data from '../../data/dataGrid.json';

const buttonStyle: any = {
  height: '60px',
  width: '240px',
  fontSize: '20px',
  backgroundColor: '#F0F0F0',
  borderColor: '#F0F0F0',
  borderRadius: '5px',
  boxShadow: 'base',
  _hover: { color: 'black', boxShadow: 'lg' },
};

const columns = [
  {
    text: 'رقم الطلب',
    dataIndex: 'id',
    span: 3,
  },
  {
    text: 'نوع الطلب',
    dataIndex: 'order_type',
    span: 3,
  },
  {
    text: 'تاريخ الطلب',
    dataIndex: 'order_date',
    span: 3,
  },
  {
    text: 'حالة الطلب',
    dataIndex: 'order_status',
    span: 2,
  },
  {
    text: 'العضو المسؤول',
    dataIndex: 'user_order',
    span: 3,
  },
  {
    text: 'ملاحظات',
    dataIndex: 'comments',
    span: 4,
  },
];

const DataGrid = () => {
  const { next, prev, currentData, currentPage, maxPage } = usePagination(data, 15);
  const [selectedId, setSelectedId] = useState(null);
  const totalSpan = columns.reduce((total, rec) => total + rec.span, 0);

  const renderHeaderColumn = (text: string, start: any, span: any) => {
    return (
      <Box
        bg="gray.200"
        px={2}
        py={2}
        minWidth={0}
        backgroundColor="#dfdfdf"
        fontWeight="bold"
        borderBottom="1px solid black"
        gridColumn={`${start} / span ${span}`}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {text}
      </Box>
    );
  };

  const getDataColumnBg = (idx: any, id: any) => {
    if (id === selectedId) {
      return { bg: '#BBBBBB' }; // selected row
    } else if (idx % 2 === 0) {
      return { bg: 'gray.50' };
    }
    return {};
  };

  const renderDataColumn = (id: any, text: string, start: any, span: any, idx: any, key: any) => {
    return (
      <Box
        px={2}
        py={1}
        {...getDataColumnBg(idx, id)}
        borderBottom={1}
        borderBottomColor="gray.200"
        minWidth={0}
        gridColumn={`${start} / span ${span}`}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        key={key}
        onClick={() => setSelectedId(id)}
      >
        {text}
      </Box>
    );
  };

  const renderFooter = () => {
    return (
      <Flex
        bg="gray.200"
        px={2}
        py={1}
        minWidth={0}
        backgroundColor="#dfdfdf"
        borderTop="1px solid black"
        justifyContent="space-between"
        gridColumn={`1 / span ${totalSpan}`}
        overflow="hidden"
      >
        <IconButton
          aria-label="previous page"
          icon={<ArrowRightIcon />}
          variant="ghost"
          borderRadius={20}
          onClick={() => next()}
        />

        <Text mt={2} fontWeight="bold">
          الصفحة {currentPage} من اصل {maxPage}
        </Text>
        <IconButton
          aria-label="next page"
          icon={<ArrowLeftIcon />}
          variant="ghost"
          borderRadius={20}
          onClick={() => prev()}
        />
      </Flex>
    );
  };

  const renderHeader = () => {
    const headerCols: any = [];
    let colStart = 1;

    columns.forEach((col) => {
      headerCols.push(renderHeaderColumn(col.text, colStart, col.span));
      colStart += col.span;
    });

    return headerCols;
  };

  const renderDataRow = (rec: any, idx: any) => {
    let colStart = 1;

    return columns.map((col) => {
      const row = renderDataColumn(rec.id, rec[col.dataIndex], colStart, col.span, idx, `${idx}-${colStart}`);
      colStart += col.span;
      return row;
    });
  };

  const renderRows = (data: any) => {
    return data.map((rec: number, idx: number) => renderDataRow(rec, idx));
  };

  const renderActions = () => {
    return (
      <Flex
        bg="gray.200"
        py={4}
        minWidth={0}
        height="100%"
        backgroundColor="#dfdfdf"
        borderTop="1px solid black"
        justifyContent="space-around"
        gridColumn={`1 / span ${totalSpan}`}
        overflow="hidden"
      >
        <Button {...buttonStyle} leftIcon={<AddIcon color="#595959" />}>
          إضافة طلب جديد
        </Button>
        <Button {...buttonStyle} leftIcon={<EditIcon color="#595959" />}>
          تعديل الطلب
        </Button>
        <Button {...buttonStyle} leftIcon={<DeleteIcon color="#595959" />}>
          حذف الطلب
        </Button>
      </Flex>
    );
  };
  return (
    <>
      <Grid
        gridTemplateColumns={`repeat(${totalSpan}, 1fr [col-start])`}
        borderRadius={8}
        border="1px"
        overflow="hidden"
        boxShadow="2xl"
        minHeight="92vh"
      >
        {renderHeader()}
        {renderRows(currentData())}
        {renderFooter()}
        {renderActions()}
      </Grid>
    </>
  );
};

export default DataGrid;
