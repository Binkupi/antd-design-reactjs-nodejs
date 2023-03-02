import axios from './../../Configs/Axios';


export const countNewOrders = async () => {
  const count = await axios.get("/orders/count/new-orders");
  return count;
};

export const countOrdersInCurrentDay = async () => {
  const count = await axios.get("/orders/count/current-day");
  return count;
};

export const countOrdersInCurrentMonth = async () => {
  const count = await axios.get("/orders/count/current-month");
  return count;
};

export const countOrdersBytMonth = async () => {
  const count = await axios.get("/orders/count/by-month");
  return count;
};

export const getProfitInCurrentMonth = async () => {
  const totalProfit = await axios.get("/orders/stat/profit-current-month");
  return totalProfit;
};

export const getProfitByMonth = async () => {
  const data = await axios.get("/orders/stat/profit-by-month");
  return data;
};

