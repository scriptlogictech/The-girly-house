import API from "./api";

// ==========================================
// GET ALL CUSTOMERS
// ==========================================

export const getAllCustomers = async () => {
  const { data } = await API.get(
    "/customers/admin/all"
  );

  return data;
};

// ==========================================
// GET CUSTOMER STATS
// ==========================================

export const getCustomerStats = async () => {
  const { data } = await API.get(
    "/customers/admin/stats"
  );

  return data;
};

// ==========================================
// GET CUSTOMER BY ID
// ==========================================

export const getCustomerById = async (id) => {
  const { data } = await API.get(
    `/customers/admin/${id}`
  );

  return data;
};

// ==========================================
// UPDATE CUSTOMER STATUS
// ==========================================

export const updateCustomerStatus = async (
  id,
  status
) => {
  const { data } = await API.patch(
    `/customers/admin/${id}/status`,
    {
      status,
    }
  );

  return data;
};