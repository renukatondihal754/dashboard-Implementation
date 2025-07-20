
export interface CustomerTypeData {
  cust_type: string;
  closed_fiscal_quarter: string;
  num_opps: number;
  acv: number;
  percent_of_total: number;
}


export interface AccountIndustryData {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  Acct_Industry: string;
  query_key: string;
}

export interface TeamData {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  Team: string;
}

export interface ACVRangeData {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  ACV_Range: string;
}
