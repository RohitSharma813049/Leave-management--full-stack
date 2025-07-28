import { Outlet } from "react-router";
import React from "react";

function Validation() {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row">
    
        <div className="hidden md:flex w-1/2 h-screen justify-center items-center p-5 pr-0 bg-gray-100">
          <img
            src="/image/pexels-tima-miroshnichenko-6550471.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Validation;
