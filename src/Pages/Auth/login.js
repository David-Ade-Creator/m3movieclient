import { Button, Modal, Form, Input, Space, Alert, Col } from "antd";
import React from "react";
import axios from "axios";
import { MovieContext } from "../../Context/MovieContext";
import { base_url } from "../../Components/Constants";

function LoginPage({ isVisible, setVisible, setRegisterVisible }) {
  const { setAuthToken } = React.useContext(MovieContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${base_url}/api/m3/login`,
        values
      );
      const registerResponse = response?.data;
      const { data } = registerResponse;
      setAuthToken(data.token);
      setLoading(false);
      setVisible(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const toggleRegisterModal = () => {
    setVisible(false);
    setRegisterVisible(true);
  };

  return (
    <Modal
      onCancel={() => setVisible(false)}
      closable={false}
      visible={isVisible}
      footer={null}
    >
      <Form
        name="Login"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Col lg={24}>
          {error && <Alert type="error" message={error} />}
          </Col>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="mt-3">
          <Space>
            <Button loading={loading} type="ghost" htmlType="submit">
              Login
            </Button>
            <Button
              disabled={loading}
              onClick={toggleRegisterModal}
              type="link"
            >
              Create New Account
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LoginPage;
