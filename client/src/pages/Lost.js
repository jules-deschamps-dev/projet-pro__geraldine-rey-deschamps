import React from "react";
import { gohome } from "../assets/Utils";

const Lost = () => {
  setTimeout(gohome(), 20000);

  return (
    <div className="container-404">
      <h1 className="m-auto text-9xl"> 404 </h1>
    </div>
  );
};

export default Lost;
