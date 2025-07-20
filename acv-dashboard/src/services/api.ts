import axios from "axios";
import { CustomerTypeData } from "../types/dataTypes";


const BASE_URL = "http://localhost:5000/api";

// ✅ Map and return properly shaped data
export const fetchCustomerType = async (): Promise<CustomerTypeData[]> => {
  const res = await axios.get(`${BASE_URL}/customer-type`);
  return res.data.map((item: any) => ({
    cust_type: item.Cust_Type, // Fix: match interface key
    closed_fiscal_quarter: item.closed_fiscal_quarter,
    num_opps: item.count,
    acv: item.acv,
    percent_of_total: item.percent_of_total || 0,
  }));
};

// export const fetchCustomerType = async () =>
//   axios.get(`${BASE_URL}/customer-type`).then(res => res.data);

export const fetchAccountIndustry = async () =>
  axios.get(`${BASE_URL}/account-industry`).then(res => res.data);

export const fetchTeam = async () =>
  axios.get(`${BASE_URL}/team`).then(res => res.data);

export const fetchACVRange = async () =>
  axios.get(`${BASE_URL}/acv-range`).then(res => res.data);
