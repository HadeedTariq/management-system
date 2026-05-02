import { toast } from "@/hooks/use-toast";
import { adminApi } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateSocietyInput } from "../../validators/admin/admin.validator";

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
    mutationKey: ["create-society-head"],
    mutationFn: async (payload: CreateSocietyInput) => {
      const { data } = await adminApi.post(
        `/users/make-society-head/`,
        payload,
      );
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
