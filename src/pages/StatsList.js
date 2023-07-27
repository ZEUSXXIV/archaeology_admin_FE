
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Site',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Page Views',
    dataIndex: 'value',
    key: 'value',
  },
];

const StatsListTop = ({array}) => {
  const [data, setData] = useState(array);

  console.log("array==>>", array)

  return <Table columns={columns} dataSource={array} pagination={false} />;
};

export default StatsListTop;


