import React from "react";
import { TableData } from "../utils/groupData";
import './DataTable.css'


interface DataTableProps {
  tableData: TableData;
}

const formatACV = (val: number) => `$${(val / 1000).toFixed(0)}K`;

const DataTable: React.FC<DataTableProps> = ({ tableData }) => {
  const { quarters, rows } = tableData;

  return (
    <div className="table-container">
      <table className="styled-table">
       <thead>
  <tr>
    <th className="border p-2 main-header" rowSpan={1}>Closed Fiscal Quarter</th>
    {quarters.map((q, idx) => (
      <th
        key={q}
        className={`border px-2 py-1 ${idx % 2 === 0 ? 'group-1' : 'group-2'}`}
        colSpan={3}
      >
        {q}
      </th>
    ))}
    <th className="border px-2 py-1 total-header" colSpan={3}>Total</th>
  </tr>
  <tr>
    <th className="border p-2 main-header" rowSpan={1}>Cust Type</th>
    {quarters.map((_, idx) => (
      <React.Fragment key={idx}>
        <th className={`border px-2 py-1 `}>#Opps</th>
        <th className={`border px-2 py-1 `}>ACV</th>
        <th className={`border px-2 py-1 `}>% of Total</th>
      </React.Fragment>
    ))}
    <th className="border px-2 py-1 total-header">#Opps</th>
    <th className="border px-2 py-1 total-header">ACV</th>
    <th className="border px-2 py-1 total-header">% of Total</th>
  </tr>
</thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.cust_type} className={idx % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{row.cust_type}</td>
              {quarters.map((q) => {
                const cell = row.data[q] || { num_opps: 0, acv: 0, percent: 0 };
                return (
                  <React.Fragment key={q}>
                    <td>{cell.num_opps}</td>
                    <td>{formatACV(cell.acv)}</td>
                    <td>{cell.percent}%</td>
                  </React.Fragment>
                );
              })}
              <td className="total-cell">{row.total.num_opps}</td>
              <td className="total-cell">{formatACV(row.total.acv)}</td>
              <td className="total-cell">{row.total.percent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
