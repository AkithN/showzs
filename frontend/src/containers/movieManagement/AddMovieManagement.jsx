import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './movieManagement.css';

const AddMovieManagement = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [trailerList, setTrailerList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailForm] = Form.useForm();

  const handleSubmit = async (values) => {
    setModalVisible(true);
  };

  const handleModalSubmit = async (values) => {
    try {
      const userResponse = await axios.post('http://127.0.0.1:8000/api/add-users', {
        email: values.email,
        password: values.password,
        full_name: values.fullName,
        phone_number: values.phoneNumber,
        user_type: 4,
      });

      if (userResponse.status === 201) {
        const movieValues = form.getFieldsValue();
        const formData = new FormData();
        formData.append('title', movieValues.title);
        formData.append('genre', movieValues.genre);
        formData.append('director', movieValues.director);
        formData.append('duration', movieValues.duration);
        formData.append('price', movieValues.price);
        formData.append('stream_link', movieValues.streamLink);

        let coverImageUrl = '';
        if (fileList.length > 0) {
          const coverImage = fileList[0].originFileObj;
          const coverImageResponse = await axios.get('http://127.0.0.1:8000/api/s3-CoverImages', {
            params: {
              file_name: coverImage.name,
              file_type: coverImage.type,
            },
          });
          await fetch(coverImageResponse.data.url, {
            method: 'PUT',
            headers: {
              'Content-Type': coverImage.type,
            },
            body: coverImage,
          });
          coverImageUrl = coverImageResponse.data.url.split('?')[0];
        }

        let trailerUrl = '';
        if (trailerList.length > 0) {
          const trailer = trailerList[0].originFileObj;
          const trailerResponse = await axios.get('http://127.0.0.1:8000/api/s3-Trailers', {
            params: {
              file_name: trailer.name,
              file_type: trailer.type,
            },
          });
          await fetch(trailerResponse.data.url, {
            method: 'PUT',
            headers: {
              'Content-Type': trailer.type,
            },
            body: trailer,
          });
          trailerUrl = trailerResponse.data.url.split('?')[0]; 
        }

        formData.append('picture', coverImageUrl);
        formData.append('trailer', trailerUrl);

        await axios.post('http://127.0.0.1:8000/api/movies', formData);
        message.success('Movie added successfully');
        form.resetFields();
        emailForm.resetFields();
        setFileList([]);
        setTrailerList([]);
        setModalVisible(false);
        onSubmit({ ...movieValues, picture: coverImageUrl, trailer: trailerUrl });
      }
    } catch (error) {
      console.error('Error adding movie or user:', error);
    }
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleTrailerUpload = ({ fileList }) => {
    setTrailerList(fileList);
  };

  return (
    <div className="admin-movie-container">
      <h2>Add New Movie</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the movie title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="genre" label="Genre" rules={[{ required: true, message: 'Please enter the movie genre' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="director" label="Director" rules={[{ required: true, message: 'Please enter the movie director' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="duration" label="Duration (in minutes)" rules={[{ required: true, message: 'Please enter the movie duration' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="price" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="picture" label="Picture" valuePropName="fileList" getValueFromEvent={handleUpload}>
          <Upload name="picture" listType="picture" beforeUpload={() => false} onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="trailer" label="Trailer" valuePropName="fileList" getValueFromEvent={handleTrailerUpload}>
          <Upload name="trailer" listType="picture" beforeUpload={() => false} onChange={handleTrailerUpload}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Add Movie</Button>
        </Form.Item>
      </Form>

      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={emailForm} layout="vertical" onFinish={handleModalSubmit}>
          <h2>Access For Content Owner</h2>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="fullName" label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddMovieManagement;
