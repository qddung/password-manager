import React from 'react';
import { Card, Button, Space, Typography, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DemoComponent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = () => {
    messageApi.success('Button clicked!');
  };

  return (
    <Card style={{ maxWidth: 600, margin: '20px auto' }}>
      {contextHolder}
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Welcome to Demo Component</Title>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text>Username</Text>
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Enter your username" 
          />
          
          <Text>Password</Text>
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Enter your password" 
          />
        </Space>

        <Button type="primary" onClick={handleClick} block>
          Click Me!
        </Button>
      </Space>
    </Card>
  );
};

export default DemoComponent; 