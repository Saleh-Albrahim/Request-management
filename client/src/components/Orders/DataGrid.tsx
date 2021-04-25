import { useState } from 'react';
import { Box, Flex, Grid, IconButton, Text, Button, useDisclosure, Select, VStack } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon, AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import usePagination from '../../hooks/userPagination';
import data from '../../data/dataGrid.json';
import AddOrder from './AddOrder';

const buttonStyle: any = {
  height: '60px',
  width: '240px',
  fontSize: '20px',
  backgroundColor: '#F0F0F0',
  borderColor: '#F0F0F0',
  borderRadius: '5px',
  boxShadow: 'base',
  border: 'none',
  _hover: { color: 'black', boxShadow: 'lg' },
};

interface Props {
  orderTypes: Array<Object>;
}

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
    dataIndex: 'order_user',
    span: 3,
  },
  {
    text: 'ملاحظات',
    dataIndex: 'order_comments',
    span: 4,
  },
];

const DataGrid: React.FC<Props> = ({ orderTypes }) => {
  const { next, prev, currentData, currentPage, maxPage } = usePagination(data, 15);
  const [selectedId, setSelectedId] = useState(null);
  const totalSpan = columns.reduce((total, rec) => total + rec.span, 0);

  const renderHeaderColumn = (index: number, text: string, start: any, span: any) => {
    return (
      <Box
        bg="gray.200"
        px={2}
        py={2}
        minWidth={0}
        key={index}
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
    if (!id) {
      return {};
    }
    if (id === selectedId) {
      return { bg: '#BBBBBB' }; // selected row
    } else if (idx % 2 === 0) {
      return { bg: '#F0F0F0' };
    }
    return {};
  };

  const renderDataColumn = (id: any, text: string, start: any, span: any, idx: any, key: any) => {
    return (
      <Box
        px={2}
        {...getDataColumnBg(idx, id)}
        minWidth={0}
        gridColumn={`${start} / span ${span}`}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        key={key}
        onClick={() => {
          if (id) {
            setSelectedId(id);
          }
        }}
      >
        {text}
      </Box>
    );
  };

  const renderFooter = () => {
    return (
      <Flex
        px={5}
        pt={3}
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

    columns.forEach((col, index: number) => {
      headerCols.push(renderHeaderColumn(index, col.text, colStart, col.span));
      colStart += col.span;
    });

    return headerCols;
  };

  const renderDataRow = (rec: any, idx: any) => {
    let colStart = 1;

    let height: any;
    return columns.map((col) => {
      const row = renderDataColumn(rec.id, rec[col.dataIndex], colStart, col.span, idx, `${idx}-${colStart}`);
      colStart += col.span;
      return row;
    });
  };

  const renderRows = (data: any) => {
    // TODO: better handle the layout when we have 15 element per page
    const res = data.map((rec: number, idx: number) => renderDataRow(rec, idx));
    let rowLength = data.length;
    while (rowLength % 15 !== 0) {
      res.push(renderDataRow('', ''));
      rowLength += 1;
    }
    return res;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const renderActions = () => {
    return (
      <Flex
        bg="gray.200"
        py={3}
        minWidth={0}
        height="100%"
        backgroundColor="#dfdfdf"
        borderTop="1px solid black"
        justifyContent="space-around"
        gridColumn={`1 / span ${totalSpan}`}
        overflow="hidden"
      >
        <Button onClick={onOpen} {...buttonStyle} leftIcon={<AddIcon color="black" />}>
          إضافة طلب جديد
        </Button>
        <Button {...buttonStyle} leftIcon={<EditIcon color="black" />}>
          تعديل الطلب
        </Button>
        <Button {...buttonStyle} leftIcon={<DeleteIcon color="black" />}>
          حذف الطلب
        </Button>
      </Flex>
    );
  };

  return (
    <VStack height="100%">
      <Select
        placeholder="جميع انواع الطلبات"
        sx={{ textAlignLast: 'center' }}
        outlineColor="black"
        focusBorderColor="none"
        variant="outline"
        fontSize="20px"
        borderColor="gray"
        boxShadow="base"
        width="500px"
        _hover={{ borderColor: 'black' }}
      >
        {orderTypes.map((type: any) => (
          <option key={type.id}>{type.order_name}</option>
        ))}
      </Select>
      <Grid
        gridTemplateColumns={`repeat(${totalSpan}, 1fr [col-start])`}
        borderRadius={8}
        border="1px"
        overflow="hidden"
        boxShadow="2xl"
        height="100%"
      >
        {renderHeader()}
        {renderRows(currentData())}
        {renderFooter()}
        {renderActions()}
      </Grid>
      <AddOrder isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </VStack>
  );
};

export default DataGrid;
