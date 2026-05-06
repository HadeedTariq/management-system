type GetMySocietiesResponse = {
  id: string;
  title: string;
  description: string | null;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
  memberCount: number;
};

type MySocietyPost = {
  id: string;
  title: string;
  description: string | null;
  isPublished: boolean;
  image: string | null;
  createdAt: string;
};

type MyPost = {
  id: string;
  title: string;
  description: string | null;
  isPublished: boolean;
  image: string | null;
  createdAt: string;
  societyId: string;
};

type MySocietyEvent = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  location: string | null;
  startTime: string;
  endTime: string | null;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
};

type MyEvent = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  location: string | null;
  startTime: string;
  endTime: string | null;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
  societyId: string;
};
