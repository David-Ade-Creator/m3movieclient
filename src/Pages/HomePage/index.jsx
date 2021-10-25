import { Space } from "antd";
import PageHeader from "Components/Header";
import Rowcontainer from "Components/LayoutComponents/Rowcontainer";
import React from "react";

function HomePage() {
  return (
    <PageHeader>
      <div className="homepage_container container">
        <div className="homepage_banner">
          <div className="homepage_img">
            <img
              src="https://theenvoyweb.com/wp-content/uploads/2021/06/The-Witcher-2.jpg"
              alt=""
            />
          </div>
          <div className="homepage_description">
              <h2 className="homepage_title">The Witcher</h2>
              <p>This is the fast and furios description and to be honest i don't even know what to write but anyway i will just do my best and see if it is fine...</p>
              <div className="homepage_btn_container">
                  <Space>
                      <span className="button_primary">Details</span>
                      <span className="button_default"><i class='bx bx-plus' ></i></span>
                  </Space>
              </div>
          </div>
        </div>
      </div>
      <Rowcontainer />
      <Rowcontainer />
    </PageHeader>
  );
}

export default HomePage;
