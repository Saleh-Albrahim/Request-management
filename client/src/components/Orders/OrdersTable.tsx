import { useState, useContext } from 'react';
import { Box, Flex, Grid, IconButton, Text, useDisclosure, Select, VStack } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import usePagination from '../../hooks/userPagination';
import OrderContext from '../../context/order/orderContext';

interface Props {
  renderActions: () => JSX.Element;
}

const columns = [
  {
    text: 'رقم الطلب',
    dataIndex: 'id',
    span: 2,
  },
  {
    text: 'نوع الطلب',
    dataIndex: 'OrderType.name',
    span: 2,
  },
  {
    text: 'تاريخ الطلب',
    dataIndex: 'date',
    span: 2,
  },
  {
    text: 'حالة الطلب',
    dataIndex: 'status',
    span: 2,
  },
  {
    text: 'العضو المسؤول',
    dataIndex: 'user.username',
    span: 3,
  },
  {
    text: 'ملاحظات',
    dataIndex: 'notes',
    span: 4,
  },
];

const OrdersTable: React.FC<Props> = ({ renderActions }) => {
  const orderContext = useContext(OrderContext);

  // @ts-ignore
  const { typeList, tableData, updateTableData } = orderContext;

  const { next, prev, currentData, currentPage, maxPage } = usePagination(tableData, 15);
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
        pt={3}
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
    while (rowLength % 15 !== 0 || rowLength === 0) {
      res.push(renderDataRow('', ''));
      rowLength += 1;
    }
    return res;
  };

  return (
    <VStack height="100%">
      <Select
        placeholder="جميع انواع الطلبات"
        sx={{ textAlignLast: 'center' }}
        height="48px"
        fontSize="20px"
        focusBorderColor="black"
        borderColor="gray"
        onChange={(e) => {
          updateTableData(e.target[e.target.selectedIndex].id);
        }}
        boxShadow="base"
        width="500px"
        _hover={{ borderColor: 'black' }}
      >
        {typeList.map((type: any) => (
          <option key={type.id} id={type.id}>
            {type.name}
          </option>
        ))}
      </Select>
      <Grid
        height="100%"
        width="100%"
        gridTemplateColumns={`repeat(${totalSpan}, 1fr [col-start])`}
        borderRadius={8}
        border="1px"
        overflow="hidden"
        boxShadow="2xl"
      >
        {renderHeader()}
        {renderRows(currentData())}
        {renderFooter()}
        {renderActions()}
      </Grid>
    </VStack>
  );
};

export default OrdersTable;
