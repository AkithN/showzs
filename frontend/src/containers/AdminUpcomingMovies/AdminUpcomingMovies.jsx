import React from 'react';
import './AdminUpcomingMovies.css';
import { Form, Input, Button, DatePicker, Select, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const AdminUpcomingMovies = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Add Upcoming Movie</h2>
      <Form
        name="add-movie"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input the movie title!' }]}
        >
          <Input placeholder='Movie Title' />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[{ required: true, message: 'Please upload the movie image!' }]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false} 
          >
            <Button icon={<UploadOutlined />}>Upload Movie Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: 'Please select the release date!' }]}
        >
          <DatePicker placeholder='Select Release Date' />
        </Form.Item>
        <Form.Item
          name="duration"
          rules={[{ required: true, message: 'Please input the movie duration!' }]}
        >
          <Input placeholder='Duration (e.g., 2h 30m)' />
        </Form.Item>
        <Form.Item
          name="category"
          rules={[{ required: true, message: 'Please select the movie category!' }]}
        >
          <Select placeholder='Select Category'>
            <Option value="Action">Action</Option>
            <Option value="Drama">Drama</Option>
            <Option value="Comedy">Comedy</Option>
            <Option value="Thriller">Thriller</Option>
            {/* Add more categories as needed */}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Please input the movie description!' }]}
        >
          <TextArea placeholder='Description' rows={4} />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Please input the ticket price!' }]}
        >
          <InputNumber min={0} placeholder='Ticket Price' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Upcoming Movie
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default AdminUpcomingMovies;