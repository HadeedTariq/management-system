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

type SocietyHeadAnalyticsResponse = {
  societiesHeadCount: number;
  totalPosts: number;
  totalEvents: number;

  topEvents: {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    location: string | null;

    status: "upcoming" | "ongoing" | "completed" | "cancelled";

    startTime: Date;
    endTime: Date | null;

    createdAt: Date;

    society: {
      id: string;
      title: string;
    };
  }[];
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
    isSaved: boolean;

    createdAt: Date;
    updatedAt: Date;
  }[];

  events: {
    id: string;

    title: string;
    description: string | null;

    image: string | null;

    location: string | null;
    isSaved: boolean;

    startTime: Date;
    endTime: Date | null;

    status: "upcoming" | "ongoing" | "completed" | "cancelled";

    createdAt: Date;
    updatedAt: Date;
  }[];
};

type SocietyEventDetails = {
  id: string;

  title: string;
  description: string | null;

  image: string | null;

  location: string | null;

  startTime: string;
  endTime: string | null;

  status: "upcoming" | "ongoing" | "completed" | "cancelled";

  createdAt: string;
  updatedAt: string;

  society: {
    id: string;

    title: string;
    description: string | null;

    status: "active" | "inactive";

    createdAt: string;
    updatedAt: string;
  };
};

type JoinedSociety = {
  membershipId: string;

  role: "member" | "admin" | "moderator";
  memberStatus: "active" | "inactive" | "banned";

  joinedAt: string;

  society: {
    id: string;

    title: string;
    description: string | null;

    status: "active" | "inactive";

    createdAt: string;
    updatedAt: string;
  };
};

type SavedPost = {
  savedId: string;

  savedAt: string;

  post: {
    id: string;

    title: string;
    description: string | null;

    image: string | null;

    isPublished: boolean;

    createdAt: string;
    updatedAt: string;
  };

  society: {
    id: string;

    title: string;
    description: string | null;

    status: "active" | "inactive";
  };

  author: {
    id: string;

    userName: string | null;
    email: string | null;
  };
};

type SavedEvent = {
  savedId: string;

  savedAt: string;

  event: {
    id: string;

    title: string;
    description: string | null;

    image: string | null;

    location: string | null;

    startTime: string;
    endTime: string | null;

    status: "upcoming" | "ongoing" | "completed" | "cancelled";

    createdAt: string;
    updatedAt: string;
  };

  society: {
    id: string;

    title: string;
    description: string | null;

    status: "active" | "inactive";
  };

  author: {
    id: string;

    userName: string | null;
    email: string | null;
  };
};
type StudentDetailsResponse = {
  student: {
    id: string;

    userName: string | null;
    email: string | null;

    role: "student" | "admin";
    source: "general" | "google";

    gender: "male" | "female" | "other" | null;

    createdAt: string;
  };

  analytics: {
    joinedSocieties: number;
    savedPosts: number;
    savedEvents: number;
  };

  joinedSocieties: {
    membershipId: string;

    role: "member" | "admin" | "society_head";
    status: "active" | "left";

    joinedAt: string;

    society: {
      id: string;

      title: string;
      description: string | null;

      status: "active" | "inactive";

      createdAt: string;
    };
  }[];

  savedPosts: {
    savedId: string;

    savedAt: string;

    post: {
      id: string;

      title: string;
      description: string | null;

      image: string | null;

      isPublished: boolean;

      createdAt: string;
    };

    society: {
      id: string;
      title: string;
    };
  }[];

  savedEvents: {
    savedId: string;

    savedAt: string;

    event: {
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

    society: {
      id: string;
      title: string;
    };
  }[];
};
