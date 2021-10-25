import { Card, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="form_container">
          <Card>
            <Form layout="vertical">
              <h1 style={{ marginBottom: "1rem", fontWeight: "bolder" }}>
                Sign In
              </h1>
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
              <span className="auth_button">Sign In</span>
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
            <p>Create new account</p>
            <Link to="/register">
              <h3>Register</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;