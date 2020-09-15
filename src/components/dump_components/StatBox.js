import React from "react";

function StatBox({ boxTitle, boxStat }) {
  return (
    <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
      <div className="px-4 py-6">
        <p>{boxTitle}</p>
        <div className="text-4xl my-2">{boxStat}</div>
      </div>
    </div>
  );
}

export default StatBox;
