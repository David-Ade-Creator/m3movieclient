import React from "react";
import "./style.css";

const DefaultLoader = () => {
  return (
    <div className="loader_container_1">
      <p className="round">
        <span className="ouro ouro3">
          <span className="left">
            <span className="anim"></span>
          </span>
          <span className="right">
            <span className="anim"></span>
          </span>
        </span>
      </p>
      <h6>CapitalMovies</h6>
    </div>
  );
};

export default DefaultLoader;
