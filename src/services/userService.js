import axiosInstance from "@/util/axiosInstance";


export const upgradeRole = (data) => axiosInstance.post('/users/upgradeRole', data);

export const createUser = (userData) => axiosInstance.post('/users/', userData);

export const getUserById = (userId) => axiosInstance.get(`/users/${userId}`);

export const updateUser = (userId, data) => axiosInstance.put(`/users/${userId}`, data);

export const deleteUser = (userId) => axiosInstance.delete(`/users/${userId}`);

export const listUsers = (role) => axiosInstance.get('/users', {params: {role}});

export const getTutorsByStatus = (status) => axiosInstance.get(`/users/tutors/status/${status}`);

export const updateTutorStatus = async ({userId, data}) => {
    try {
        const response = await axiosInstance.patch(`/users/tutors/${userId}/status`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const filterUsers = (params) => axiosInstance.get('/users/filter', {params});