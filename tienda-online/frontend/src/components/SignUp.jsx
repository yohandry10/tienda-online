import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Signup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setError('');
      setLoading(true);
      await signup(values.email, values.password);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
      {error && <Alert message={error} type="error" style={{ marginBottom: '20px' }} />}
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="email" rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your email!' }]}>
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Sign Up</Button>
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/signin">
              Log In
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
