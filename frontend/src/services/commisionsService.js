import api from "./api";

export const getCommissions = async (month, year) => {
  const params = {};
  if (month) params.month = month;
  if (year) params.year = year;

  const response = await api.get("/commissions", { params });
  return response.data;
};
