import React from "react";
import PropTypes from "prop-types";

function Table({ headers, data }) {
  return (
    <div>
      <table className="table-auto border-4 mx-auto">
        <thead>
          <tr className="text-xl">
            {headers.map((header, index) => {
              return (
                <th key={index} className="px-4 py-2">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return <tr key={index}>value</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
Table.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
};

export default Table;
