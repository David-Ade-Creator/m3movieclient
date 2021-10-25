import { Card, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="form_container">
          <Card>
            <Form layout="vertical">
              <h1 style={{ marginBottom: "1rem", fontWeight: "bolder" }}>
                Create New Account
              </h1>
              <Row gutter={12}>
                <Col lg={12} ms={12} sm={12} xs={12}>
                  <Form.Item
                    label="Firstname"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your firstname!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your firstname" />
                  </Form.Item>
                </Col>
                <Col lg={12} ms={12} sm={12} xs={12}>
                  <Form.Item
                    label="Lastname"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your lastname!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your lastname" />
                  </Form.Item>
                </Col>

                <Col lg={24} ms={24} sm={24} xs={24}>
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
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>

                <Col lg={24} ms={24} sm={24} xs={24}>
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
                    <Input placeholder="Enter your password" />
                  </Form.Item>
                </Col>

                <Col lg={24} ms={24} sm={24} xs={24}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input password again!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your password again" />
                  </Form.Item>
                </Col>
              </Row>

              <span className="auth_button">Sign Up</span>
            </Form>
          </Card>
        </div>
      </div>
      <div className="login_form_design">
        <div className="login_design">
          <div>
            <div className="login_design_header">
              <h2> M3Movies </h2>
            </div>
            <div className="login_design_desc">
              <h4>Watch it</h4>
              <p>Watch your favorite movies</p>
            </div>
          </div>
          <div className="already_signin">
            <p>Already have an account ?</p>
            <Link to="/login">
              <h3>Login</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
