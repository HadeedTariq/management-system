type User = {
  id: string;
  user_name?: string;
  email: string;
  role: string;
  gender: "male" | "female" | "other";
  country_code: string;
};

type ErrResponse = {
  response: {
    data: {
      message: string;
      otpType?: string;
      code?: string;
    };
  };
};

type GetAllSocietiesResponse = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  memberCount: number;
};

type GetAllEventsResponse = {
  id: string;

  title: string;
  description: string | null;

  image: string | null;

  location: string | null;

  startTime: Date;
  endTime: Date | null;

  status: "upcoming" | "ongoing" | "completed" | "cancelled";

  createdAt: Date;
  updatedAt: Date;

  society: {
    id: string;
    title: string;
    description: string | null;
    status: string;
  };
};

type SocietyDetailsResponse = {
  id: string;

  title: string;
  description: string | null;

  status: "active" | "inactive";

  createdAt: Date;
  updatedAt: Date;

  members: {
    id: string;

    role: "member" | "admin" | "society_head";
    status: "active" | "left";

    joinedAt: Date;

    user: {
      userName: string | null;
      userId: string | null;
    };
  }[];

  posts: {
    id: string;

    title: string;
    description: string | null;

    image: string | null;

    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
  }[];

  events: {
    id: string;

    title: string;
    description: string | null;

    image: string | null;

    location: string | null;

    startTime: Date;
    endTime: Date | null;

    status: "upcoming" | "ongoing" | "completed" | "cancelled";

    createdAt: Date;
    updatedAt: Date;
  }[];
};
