import React from "react";

function DetailLoader({fullPage}) {
  return (
    <div className={`loader_flexbox`}>
      <div>
        <div className="nb-spinner"></div>
      </div>
    </div>
  );
}

export default DetailLoader;
