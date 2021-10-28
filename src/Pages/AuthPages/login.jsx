import { Alert, Button, Card, Form, Input } from "antd";
import axios from "axios";
import { base_url } from "Components/Data";
import { MovieContext } from "Context/MovieContext";
import React from "react";
import { Link, useHistory } from "react-router-dom";

function AuthPage() {
  const history = useHistory()
  const { auth,setAuthToken } = React.useContext(MovieContext);
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
      history.push("/")
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  React.useEffect(()=>{
    if(auth.data) history.push("/");
  },[auth.data, history]);


  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="form_container">
          <Card>
          <Alert type="error" message={error} />
            <Form layout="vertical" onFinish={onFinish}>
              <h1 style={{ marginBottom: "1rem", fontWeight: "bolder" }}>
                Login
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
              <Button htmlType="submit" type="danger" loading={loading}>Login</Button>
              <div className="already_signin_mini">
            <Link to="/register">
              <h4>Create new account ? Register</h4>
            </Link>
          </div>
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