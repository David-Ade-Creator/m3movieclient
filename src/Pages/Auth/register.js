import React from 'react';
import axios from "axios";
import { Button, Modal, Form, Input, Space, Row, Col } from 'antd'


function RegisterPage() {
    const [loading,setLoading] = React.useState(false);

    const onFinish = async (values) => {
        try {
        setLoading(true);
        const response = await axios.post(`http://localhost:1100/api/m3/register`, values);
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
        <Row gutter={10}>
            <Col lg={12} md={12} sm={12} xs={12} >
            <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
            <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
            </Col>
        </Row>
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

export default RegisterPage;
