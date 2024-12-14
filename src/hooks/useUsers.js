import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    upgradeRole,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    listUsers,
    getTutorsByStatus,
    updateTutorStatus,
    filterUsers,
} from "@/services/userService";

const defaultQueryOptions = {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
};

export const useUsers = (role) =>
    useQuery({
        queryKey: ["users", role],
        queryFn: () => listUsers(role),
        ...defaultQueryOptions,
        refetchInterval: 5000,
    });

export const useUserById = (userId) =>
    useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
        ...defaultQueryOptions
    });

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]});
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        }
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(({userId, data}) => updateUser(userId, data), {
        onSuccess: (data, {userId}) => {
            queryClient.invalidateQueries(['users']);
            queryClient.invalidateQueries(['user', userId]);
        },
        onError: (error, variables) => {
            console.error('Error updating user:', error, variables);
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: (data, {userId}) => {
            queryClient.invalidateQueries(['users']);
            queryClient.invalidateQueries(['user', userId]);
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
        },
    });
};

export const useTutorsByStatus = (status) =>
    useQuery({
        queryKey: ["tutors", status],
        queryFn: () => getTutorsByStatus(status),
        enabled: !!status,
        ...defaultQueryOptions
    });

export const useFilterUsers = (params) =>
    useQuery({
        queryKey: ["users", "filter", params],
        queryFn: () => filterUsers(params),
        enabled: !!Object.keys(params).length,
        ...defaultQueryOptions,
        placeholderData: (previousData) => previousData
    });

export const useUpgradeRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: upgradeRole,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["users"]})
            },
            onError: (error) => {
                console.error('Role upgrade - error:', error);
            }
        }
    );
};

export const useUpdateTutorStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (variables) => {
            console.log("Mutation variables:", variables);
            await updateTutorStatus(variables)
        },
        onSuccess: () => {
            console.log("Status updated successfully!");
            queryClient.invalidateQueries({queryKey: ["tutors"]});
        },
        onError: (error) => {
            console.log("--------------------error updating tutor status: ", error);

        }
    });
};
