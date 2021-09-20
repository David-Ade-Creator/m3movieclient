import { Button, Modal, Form, Input, Space } from 'antd'
import React from 'react';
import axios from 'axios';

function LoginPage(){
    const [loading,setLoading] = React.useState(false);

    const onFinish = async (values) => {
        try {
        setLoading(true);
        const response = await axios.post(`http://localhost:1100/api/m3/login`, values);
        const registerResponse = response?.data;
        const {data, token} = registerResponse;
        console.log(data,token)
        setLoading(false)
        } catch (error) {
            setLoading(false);
            console.log(error.response.data.errors);
        }
        
      };
 

    return (
        <Modal 
        // onCancel={closeModal}
        closable={false}
        visible={true}
        footer={null}>
               <Form
      name="Login"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item className="mt-3"
      >
          <Space>
        <Button loading={loading} type="ghost" htmlType="submit">
          Login
        </Button>
        <Button disabled={loading} type="link" >
        Create New Account
        </Button></Space>
      </Form.Item>
    </Form>
        </Modal>
    )
}

export default LoginPage;
