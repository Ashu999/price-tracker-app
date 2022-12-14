import { Popconfirm, Table } from 'antd';
import React from 'react';

export type Props = {
  tableData: Array<tableDataObject>;
  deleteItem: Function;
  loading: boolean;
};
type tableDataObject = {
  key: string;
  name: string;
  url: string;
  price: string;
};

export const TableComp: React.FC<Props> = ({
  tableData,
  deleteItem,
  loading,
}) => {
  const handleDelete = (key: string) => {
    // console.log('DEL KEY: ', key);
    const newData = tableData.filter((item) => item.key !== key);
    deleteItem(key);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      render: (_: any, record: { url: string }) =>
        tableData.length >= 1 ? (
          <a href={record.url} target='_blank' rel='noreferrer noopener'>
            Item Link
          </a>
        ) : null,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: { key: string }) =>
        tableData.length >= 1 ? (
          <Popconfirm
            title='Sure to delete the Item?'
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <Table
      loading={loading}
      dataSource={tableData}
      columns={columns}
      title={() => (
        <>
          <strong style={{ color: '#108ee9' }}>🍳Items Being Tracked</strong>
        </>
      )}
      bordered
    />
  );
};
