import React from "react";

function TableResponse({ columns, rows }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="min-w-full border border-gray-300 dark:border-gray-600 text-sm">
        <thead className="bg-gray-300 dark:bg-gray-800">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 border dark:border-gray-700">
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} className="px-3 py-2 border dark:border-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableResponse;
