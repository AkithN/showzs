import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import './liveEventPayment.css';

const { Search } = Input;

const columns = [
  {
    title: 'User Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobile_number',
  },
  {
    title: 'Paid Amount',
    dataIndex: 'price',
  },
  {
    title: 'Event Name',
    dataIndex: 'title',
  },
  {
    title: 'Date & Time',
    dataIndex: 'created_at',
  },
];

const LiveEventPayment = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Fetch live event payments
    axios.get('http://127.0.0.1:8000/api/live-event-payments')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching live event payments', error);
      });
  }, []);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = searchText
    ? data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item.mobile_number.includes(searchText) ||
        item.price.includes(searchText) ||
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  return (
    <div className="live-event-payment-container">
      <Search
        placeholder="Search..."
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
        style={{ marginBottom: 16, width: '100%' }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default LiveEventPayment;
