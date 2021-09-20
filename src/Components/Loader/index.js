import React from "react";
import "./style.css";

const DefaultLoader = () => {
  return (
    <div className="loader_container_1">
      <p className="round">
        <span class="ouro ouro3">
          <span class="left">
            <span class="anim"></span>
          </span>
          <span class="right">
            <span class="anim"></span>
          </span>
        </span>
      </p>
      <h6>CapitalMovies</h6>
    </div>
  );
};

export default DefaultLoader;
