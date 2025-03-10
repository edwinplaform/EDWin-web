import axiosInstance from "@/util/axiosInstance";

export const upgradeRole = (data) =>
  axiosInstance.post("/users/upgradeRole", data);

export const createUser = (userId, userData) =>
  axiosInstance.post(`/users/${userId}`, userData);

export const getUserById = (userId) => axiosInstance.get(`/users/${userId}`);

export const updateUser = async ({ userId, userData }) => {
  const response = await axiosInstance.patch(`/users/${userId}`, userData);
  return response.data;
};

export const updatePassword = async ({ password }) => {
  const response = await axiosInstance.patch("/change-password", password);
  return response.data;
};

export const updateBankDetails = async ({ userId, bankDetails }) => {
  const response = await axiosInstance.patch(
    `/tutors/${userId}/bank`,
    bankDetails
  );
  return response.data;
};

export const deleteUser = (userId) => axiosInstance.delete(`/users/${userId}`);

export const listUsers = (role) =>
  axiosInstance.get("/users", { params: { role } });

export const getTutorsByStatus = (status) =>
  axiosInstance.get(`/users/tutors/status/${status}`);

export const updateTutorStatus = async ({ userId, data }) => {
  try {
    const response = await axiosInstance.patch(
      `/users/tutors/${userId}/status`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const filterUsers = (params) =>
  axiosInstance.get("/users/filter", { params });
