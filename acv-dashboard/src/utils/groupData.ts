import { CustomerTypeData } from "../types/dataTypes";

interface FormattedCell {
  num_opps: number;
  acv: number;
  percent: number;
}

export interface FormattedRow {
  cust_type: string;
  data: Record<string, FormattedCell>;
  total: {
    num_opps: number;
    acv: number;
    percent: number;
  };
}

export interface TableData {
  quarters: string[];
  rows: FormattedRow[];
}

export function groupDataForTable(data: CustomerTypeData[]): TableData {
  const grouped: Record<string, Record<string, FormattedCell>> = {};
  const quartersSet = new Set<string>();

  data.forEach((item) => {
    const { cust_type, closed_fiscal_quarter, num_opps, acv, percent_of_total } = item;
    quartersSet.add(closed_fiscal_quarter);
    if (!grouped[cust_type]) grouped[cust_type] = {};
    grouped[cust_type][closed_fiscal_quarter] = {
      num_opps,
      acv,
      percent: percent_of_total,
    };
  });

  const quarters = Array.from(quartersSet).sort();
  const rows: FormattedRow[] = [];

  for (const custType in grouped) {
    const rowData: Record<string, FormattedCell> = {};
    let totalOpps = 0;
    let totalACV = 0;
    let totalPercent = 0;

    quarters.forEach((q) => {
      const cell = grouped[custType][q] || { num_opps: 0, acv: 0, percent: 0 };
      rowData[q] = cell;
      totalOpps += cell.num_opps;
      totalACV += cell.acv;
      totalPercent += cell.percent;
    });

    rows.push({
      cust_type: custType,
      data: rowData,
      total: {
        num_opps: totalOpps,
        acv: totalACV,
        percent: Math.round(totalPercent / quarters.length),
      },
    });
  }

  // Add a total row
  const totalRow: FormattedRow = {
    cust_type: "Total",
    data: {},
    total: { num_opps: 0, acv: 0, percent: 100 },
  };

  quarters.forEach((q) => {
    let totalOpps = 0;
    let totalACV = 0;
    rows.forEach((row) => {
      totalOpps += row.data[q]?.num_opps || 0;
      totalACV += row.data[q]?.acv || 0;
    });

    totalRow.data[q] = {
      num_opps: totalOpps,
      acv: totalACV,
      percent: 100,
    };

    totalRow.total.num_opps += totalOpps;
    totalRow.total.acv += totalACV;
  });

  rows.push(totalRow);

  return { quarters, rows };
}
