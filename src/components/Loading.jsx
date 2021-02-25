import React from "react";
import "./Loading.css";
import PropTypes from "prop-types";

function Loading(props) {
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-opacity-0">
        <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
          <div className="loaderDots block relative w-20 h-5 mt-2">
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-xmrorange"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-xmrorange"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-xmrorange"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-xmrorange"></div>
          </div>
          <div className="text-gray-500 text-xs font-light mt-2 text-center">
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
}
// Defining property types
Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
