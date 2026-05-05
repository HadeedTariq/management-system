import { toast } from "@/hooks/use-toast";
import { societyHeadApi } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useGetMySocieties = () => {
  const queryKey = ["get-my-societies"];
  const url = `/my-societies`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await societyHeadApi.get(url);
      return data as GetMySocietiesResponse[];
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useGetMySocietyPosts = (id: string) => {
  const queryKey = [`get-my-society-posts-${id}`];
  const url = `/society-posts/${id}`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await societyHeadApi.get(url);
      return data as MySocietyPost[];
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useGetSocietyPostDetails = (postId: string) => {
  const queryKey = [`get-society-post-details-${postId}`];
  const url = `/society-posts/details/${postId}`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await societyHeadApi.get(url);
      return data as MySocietyPost;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useCreatePost = (societyId: string) => {
  const navigate = useNavigate();

  const result = useMutation({
    mutationKey: ["create-society-post", societyId],

    mutationFn: async (formData: FormData) => {
      const { data } = await societyHeadApi.post(
        `/society-posts/create/${societyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    },

    onSuccess: (data: any) => {
      toast({
        title: "Post created",
        description: "Your post has been published successfully.",
      });

      navigate(`/society-head-dashboard/my-society/posts/${societyId}`);
    },

    onError: (error: ErrResponse) => {
      toast({
        title: "Post creation failed",
        description:
          error.response?.data?.message ||
          "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  return result;
};

export const useUpdatePost = (societyId: string, postId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: ["update-society-post", societyId, postId],

    mutationFn: async (formData: FormData) => {
      const { data } = await societyHeadApi.put(
        `/society-posts/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    },

    onSuccess: () => {
      toast({
        title: "Post updated",
        description: "Your post has been updated successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-my-society-posts-${societyId}`],
      });

      navigate(`/society-head-dashboard/my-society/posts/${societyId}`);
    },

    onError: (error: ErrResponse) => {
      toast({
        title: "Post update failed",
        description:
          error.response?.data?.message ||
          "Failed to update post. Please try again.",
        variant: "destructive",
      });
    },
  });

  return result;
};

export const useDeletePost = (societyId: string) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: ["delete-society-post", societyId],

    mutationFn: async (postId: string) => {
      const { data } = await societyHeadApi.delete(`/society-posts/${postId}`);

      return data;
    },

    onSuccess: () => {
      toast({
        title: "Post deleted",
        description: "The post has been removed successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-my-society-posts-${societyId}`],
      });
    },

    onError: (error: ErrResponse) => {
      toast({
        title: "Delete failed",
        description:
          error.response?.data?.message ||
          "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    },
  });

  return result;
};
