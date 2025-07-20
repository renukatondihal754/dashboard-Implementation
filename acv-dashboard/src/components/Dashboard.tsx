// import React, { useEffect, useState } from "react";
// import DataCard from "./DataCard";
// import { fetchCustomerType } from "../services/api";
// import { CustomerTypeData } from "../types/dataTypes";
// import BarChart from "./BarChart";
// import DonutChart from "./DonutChart";
// import DataTable from "./DataTable"; // ✅ Import the table

// const Dashboard = () => {
//   const [customerData, setCustomerData] = useState<CustomerTypeData[]>([]);

//   useEffect(() => {
//     fetchCustomerType().then(setCustomerData);
//   }, []);

//   return (
    // <div style={{ padding: 20 }}>
    //   <DataCard title="Customer Type">
    //     <BarChart data={customerData} dataKey="Cust_Type" />
    //     <DonutChart data={customerData} dataKey="Cust_Type" />
    //   </DataCard>

    //   {/* ✅ Render the Data Table */}
    //   <DataTable data={customerData} />
    // </div>
//   );
// };

// export default Dashboard;

// src/components/Dashboard.tsx
// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import DataCard from "./DataCard";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import DataTable from "./DataTable";
import { fetchCustomerType } from "../services/api";
import { CustomerTypeData } from "../types/dataTypes";
import { groupDataForTable, TableData } from "../utils/groupData";

const Dashboard: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerTypeData[]>([]);
  const [tableData, setTableData] = useState<TableData | null>(null);

  useEffect(() => {
    fetchCustomerType().then((data) => {
      setCustomerData(data);
      setTableData(groupDataForTable(data));
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <DataCard title="">
        <BarChart data={customerData} dataKey="cust_type" />
        <DonutChart data={customerData} dataKey="cust_type" />
      </DataCard>

      <DataCard title="">
        {tableData && <DataTable tableData={tableData} />}
      </DataCard>
    </div>
  );
};

export default Dashboard;
