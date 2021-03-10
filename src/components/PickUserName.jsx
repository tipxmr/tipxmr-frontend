import React from "react";

function PickUserName({ onChange, isLoading, userNameError }) {
    return (
        <div className="text-center mt-10">
            <h2 className="text-2xl">Pick your username</h2>
            <input
                className="text-xmrgray-darker p-2 rounded focus:border-none"
                onChange={onChange}
                disabled={isLoading}
            ></input>
            <p className="text-xmrorange mt-2">{userNameError}</p>
            <p className="tracking-tight text-xs text-xmrgray-light mt-2">
                This name cannot be changed once chosen
      </p>
        </div>
    );
}

export default PickUserName
