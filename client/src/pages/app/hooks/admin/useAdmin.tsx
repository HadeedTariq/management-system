import { toast } from "@/hooks/use-toast";
import { adminApi } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateSocietyInput } from "../../validators/admin/admin.validator";

export const useGetAdminPanelReachable = () => {
  const queryKey = "get-admin-panel-reachable";
  const url = "/reach-able";

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await adminApi.get(url);
      return data;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useGetAllSocieties = () => {
  const queryKey = ["get-admin-societies"];
  const url = `/society/all`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await adminApi.get(url);
      return data as AdminSociety[];
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useGetSocietyDetails = (id: string) => {
  const queryKey = [`get-society-details-${id}`];
  const url = `/society/details/${id}`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await adminApi.get(url);
      return data as AdminSociety;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useGetSocietyExistingMembers = (id: string) => {
  const queryKey = [`get-society-existing-members-${id}`];
  const url = `/society/get-existing-members/${id}`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await adminApi.get(url);
      return data as SocietyMemberDetails[];
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useCreateSociety = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-society"],
    mutationFn: async (payload: CreateSocietyInput) => {
      const { data } = await adminApi.post(`/society/create`, payload);
      return data;
    },

    onSuccess: (data) => {
      toast({
        title: "Society created",
        description: data?.message || "Society has been created successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["get-admin-societies"],
      });
    },

    onError: (error: ErrResponse) => {
      const message =
        error.response?.data?.message ||
        "Something went wrong while creating the society";

      toast({
        title: "Creation failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};
export const useUpdateSociety = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`update-society-${id}`],

    mutationFn: async (payload: Partial<CreateSocietyInput>) => {
      const { data } = await adminApi.put(`/society/update/${id}`, payload);
      return data;
    },

    onSuccess: (data) => {
      toast({
        title: "Society updated",
        description: data?.message || "Society has been updated successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["get-admin-societies"],
      });
    },

    onError: (error: ErrResponse) => {
      const message =
        error.response?.data?.message ||
        "Something went wrong while updating the society";

      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteSociety = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`delete-society-${id}`],

    mutationFn: async () => {
      if (!id) {
        toast({
          title: "Deletion id required",
          variant: "destructive",
        });

        return;
      }
      const { data } = await adminApi.delete(`/society/delete/${id}`);
      return data;
    },

    onSuccess: (data) => {
      toast({
        title: "Society deleted",
        description: data?.message || "Society has been deleted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["get-admin-societies"],
      });
    },

    onError: (error: ErrResponse) => {
      const message =
        error.response?.data?.message ||
        "Something went wrong while deleting the society";

      toast({
        title: "Deletion failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};

export const useGetPlatformUsers = (pageParam: number) => {
  const queryKey = [`get-platform-users-${pageParam}`];

  const url = `/users/all?pageNo=${pageParam}`;

  const result = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data } = await adminApi.get(url);
      return {
        currentPage: data.currentPage as number,
        totalPages: data.totalPages as number,
        totalUsers: data.totalUsers as number,
        users: data.users as AdminUserListItem[],
      };
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};
export const useCreateSocietyHead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["make-society-head"],
    mutationFn: async (payload: { societyId: string; userId: string }) => {
      const { data } = await adminApi.post(
        `/users/make-society-head/`,
        payload,
      );
      return { ...data, societyId: payload.societyId };
    },

    onSuccess: (data: any) => {
      toast({
        title: "Society Head Assigned",
        description:
          data?.message ||
          "The user has been successfully assigned as the society head.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-society-existing-members-${data.societyId}`],
      });
    },

    onError: (error: ErrResponse) => {
      const message =
        error.response?.data?.message ||
        "Failed to assign society head. Please try again.";

      toast({
        title: "Assignment Failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};

export const useRemoveSocietyHead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["remove-society-head"],
    mutationFn: async (payload: { societyId: string; userId: string }) => {
      const { data } = await adminApi.post(
        `/users/remove-society-head/`,
        payload,
      );
      return { ...data, societyId: payload.societyId };
    },

    onSuccess: (data: any) => {
      toast({
        title: "Society Head Removed",
        description:
          data?.message ||
          "The user has been removed from the society head role.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-society-existing-members-${data.societyId}`],
      });
    },

    onError: (error: ErrResponse) => {
      const message =
        error.response?.data?.message ||
        "Failed to remove society head. Please try again.";

      toast({
        title: "Removal Failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteUser = (currentPage: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (payload: { userId: string }) => {
      const { data } = await adminApi.delete(`/users/delete/${payload.userId}`);
      return { ...data, userId: payload.userId };
    },

    onSuccess: (data: any) => {
      toast({
        title: "User Deleted",
        description: data?.message || "The user has been successfully deleted.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-platform-users-${currentPage}`],
      });
    },

    onError: (error: ErrResponse) => {
      const message =
        error.response?.data?.message ||
        "Failed to delete user. Please try again.";

      toast({
        title: "Deletion Failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};

export const useBanUser = (currentPage: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ban-user"],
    mutationFn: async (payload: { userId: string }) => {
      const { data } = await adminApi.post(`/users/ban/`, {
        userId: payload.userId,
      });
      return { ...data, userId: payload.userId };
    },

    onSuccess: (data: any) => {
      toast({
        title: "User Banned",
        description: data?.message || "The user has been successfully banned.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-platform-users-${currentPage}`],
      });
    },

    onError: (error: ErrResponse) => {
      const message =
        error.response?.data?.message ||
        "Failed to ban user. Please try again.";

      toast({
        title: "Ban Failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};
