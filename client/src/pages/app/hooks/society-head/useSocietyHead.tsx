import { toast } from "@/hooks/use-toast";
import { societyHeadApi } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreatePostInput } from "../../routes/society-head/CreateSocietyPost";

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
