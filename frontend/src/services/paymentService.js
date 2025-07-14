import api from "./api";

export const createPayment = async (data) => {
  const response = await api.post("/payments", data);
  return response.data;
};

export const getPaymentHistory = async (sellingId) => {
  const response = await api.get(`/payments/${sellingId}`);
  return response.data;
};

export const getSales = async () => {
  const response = await api.get("/sales");
  return response.data;
};

export const getSaleById = async (id) => {
  try {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Gagal mengambil data transaksi"
    );
  }
};