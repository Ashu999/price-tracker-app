import { Popconfirm, Table } from 'antd';
import React, { useState } from 'react';

export const TableComp: React.FC = () => {
  const handleDelete = (key: Number) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      name: 'Mikey',
      url: 'Mike',
      price: 32,
    },
    {
      key: 2,
      name: 'KK',
      url: 'John',
      price: 42,
    },
  ]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: { key: Number }) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      title={() => (
        <>
          <strong style={{ color: '#108ee9' }}>Items Being Tracked</strong>
        </>
      )}
      bordered
    />
  );
};
