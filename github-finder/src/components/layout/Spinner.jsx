import React from "react";
import spinner from "./assets/Loader.gif";
function Spinner() {
  return (
    <div className="w-100 mt-100">
      <img
        src={spinner}
        alt="loading..."
        width={180}
        className="text-center mx-auto"
      />
    </div>
  );
}

export default Spinner;
