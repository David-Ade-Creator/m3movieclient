import { Avatar, Dropdown, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { URL } from "../Constants";
import "./style.css";
import { MovieContext } from "../../Context/MovieContext";
import LoginPage from "../../Pages/Auth/login";
import RegisterPage from "../../Pages/Auth/register";

function MovieHeader({ toggleLogin, toggleRegister }) {
  const history = useHistory();
  const { auth } = React.useContext(MovieContext);
  const [loginModal, setLoginModal] = React.useState(false);
  const [registerModal, setRegisterModal] = React.useState(false);
  const user = auth.data?._doc;

  const menu = (
    <Menu>
      <Menu.Item>David Adeyemi</Menu.Item>
      {!user && <Menu.Item onClick={()=>setLoginModal(true)}>Login</Menu.Item>}
      {!user && <Menu.Item onClick={()=>setRegisterModal(true)}>Register</Menu.Item>}
      {user && (
        <Menu.Item onClick={() => history.push(URL.MyList)}>
          Favourites
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="header_container">
      <LoginPage
        isVisible={loginModal}
        setVisible={setLoginModal}
        setRegisterVisible={setRegisterModal}
      />
      <RegisterPage
        isVisible={registerModal}
        setVisible={setRegisterModal}
        setLoginVisible={setLoginModal}
      />
      <Link to={URL.HomePage} style={{ textDecoration: "none" }}>
        <span className="logo">CapitalMovies</span>
      </Link>
      <div>
        <Dropdown overlay={menu} placement="topRight">
          <Avatar size="small" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
}

export default MovieHeader;
