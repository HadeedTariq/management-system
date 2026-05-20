import { toast } from "@/hooks/use-toast";
import { societyHeadApi } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useGetMyAnalytics = () => {
  const queryKey = "get-my-analytics";
  const url = `/my-analytics`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await societyHeadApi.get(url);
      return data as SocietyHeadAnalyticsResponse;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useGetMySocieties = () => {
  const queryKey = "get-my-societies";
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

export const useGetMyAllPosts = () => {
  const queryKey = [`get-my-posts`];
  const url = `/my-posts`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await societyHeadApi.get(url);
      return data as MyPost[];
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useGetMyAllEvents = () => {
  const queryKey = [`get-my-events`];
  const url = `/my-events`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await societyHeadApi.get(url);
      return data as MyEvent[];
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

export const useGetMySocietyEvents = (id: string) => {
  const queryKey = [`get-my-society-events-${id}`];
  const url = `/society-events/${id}`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await societyHeadApi.get(url);
      return data as MySocietyEvent[];
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

export const useGetSocietyEventDetails = (eventId: string) => {
  const queryKey = [`get-society-event-details-${eventId}`];
  const url = `/society-events/details/${eventId}`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await societyHeadApi.get(url);
      return data as MySocietyEvent;
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

export const useCreateEvent = (societyId: string) => {
  const navigate = useNavigate();

  const result = useMutation({
    mutationKey: ["create-society-event", societyId],

    mutationFn: async (formData: FormData) => {
      const { data } = await societyHeadApi.post(
        `/society-events/create/${societyId}`,
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
        title: "Event created",
        description: "Your event has been published successfully.",
      });

      navigate(`/society-head-dashboard/my-society/events/${societyId}`);
    },

    onError: (error: ErrResponse) => {
      toast({
        title: "Event creation failed",
        description:
          error.response?.data?.message ||
          "Failed to create event. Please try again.",
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

export const useUpdateEvent = (societyId: string, eventId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: ["update-society-event", societyId, eventId],

    mutationFn: async (formData: FormData) => {
      const { data } = await societyHeadApi.put(
        `/society-events/${eventId}`,
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
        title: "Event updated",
        description: "Your event has been updated successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-my-society-events-${societyId}`],
      });

      navigate(`/society-head-dashboard/my-society/events/${societyId}`);
    },

    onError: (error: ErrResponse) => {
      toast({
        title: "Event update failed",
        description:
          error.response?.data?.message ||
          "Failed to update event. Please try again.",
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

export const useDeleteEvent = (societyId: string) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: ["delete-society-event", societyId],

    mutationFn: async (eventId: string) => {
      const { data } = await societyHeadApi.delete(
        `/society-events/${eventId}`,
      );

      return data;
    },

    onSuccess: () => {
      toast({
        title: "Event deleted",
        description: "The event has been removed successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-my-society-events-${societyId}`],
      });
    },

    onError: (error: ErrResponse) => {
      toast({
        title: "Delete failed",
        description:
          error.response?.data?.message ||
          "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    },
  });

  return result;
};
