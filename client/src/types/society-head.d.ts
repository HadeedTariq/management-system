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
  image: string | null;
  createdAt: string;
};
