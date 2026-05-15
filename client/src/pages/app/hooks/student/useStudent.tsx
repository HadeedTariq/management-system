import { toast } from "@/hooks/use-toast";
import { studentApi } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllPlatformSocieities = () => {
  const queryKey = ["get-all-platform-societies"];
  const url = `/get-all-societies`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await studentApi.get(url);
      return data as GetAllSocietiesResponse[];
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useGetAllPlatformEvents = () => {
  const queryKey = ["get-all-platform-events"];
  const url = `/get-all-events`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await studentApi.get(url);
      return data as GetAllEventsResponse[];
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
      const { data } = await studentApi.get(url);
      return data as SocietyDetailsResponse;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};

export const useJoinSociety = (societyId: string) => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: ["join-society", societyId],

    mutationFn: async () => {
      const { data } = await studentApi.post(`/society/join/${societyId}`);

      return data;
    },

    onSuccess: (data: any) => {
      toast({
        title: "Society joined",
        description:
          data?.message || "You have successfully joined the society.",
      });
      queryClient.invalidateQueries({
        queryKey: [`get-society-details-${societyId}`],
      });
    },

    onError: (error: ErrResponse) => {
      toast({
        title: "Failed to join society",
        description:
          error.response?.data?.message ||
          "Unable to join the society right now. Please try again later.",
        variant: "destructive",
      });
    },
  });

  return result;
};
export const useLeaveSociety = (societyId: string) => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: ["leave-society", societyId],

    mutationFn: async () => {
      const { data } = await studentApi.post(`/society/leave/${societyId}`);

      return data;
    },

    onSuccess: (data: any) => {
      toast({
        title: "Society left",
        description: data?.message || "You have successfully left the society.",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-society-details-${societyId}`],
      });
    },

    onError: (error: ErrResponse) => {
      toast({
        title: "Failed to leave society",
        description:
          error.response?.data?.message ||
          "Unable to leave the society right now. Please try again later.",
        variant: "destructive",
      });
    },
  });

  return result;
};

export const useGetEventDetails = (id: string) => {
  const queryKey = [`get-event-details-${id}`];
  const url = `/event/details/${id}`;

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await studentApi.get(url);
      return data as SocietyEventDetails;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 300000,
  });

  return result;
};
