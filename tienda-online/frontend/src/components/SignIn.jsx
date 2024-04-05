import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Spin, Alert } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const SignIn = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setError('');
      setLoading(true);
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
      setError('Failed to log in. Please check your email and password.');
      setLoading(false);
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Log In</Title>
      {error && <Alert message={error} type="error" style={{ marginBottom: '20px' }} />}
      <Spin spinning={loading} indicator={antIcon}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Log In</Button>
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              Need an account?{' '}
              <Link to="/signup" style={{ marginLeft: '5px' }}>
                Sign Up
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default SignIn;
