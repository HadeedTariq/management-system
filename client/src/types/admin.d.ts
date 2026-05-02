type AdminSociety = {
  id: string;
  title: string;
  description: string | null;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
};

type AdminUserListItem = {
  id: string;
  userName: string | null;
  email: string | null;
  role: "customer" | "admin";
  source: "general" | string;
  isVerified: boolean | null;
  isActive: boolean | null;
  gender: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type SocietyMemberDetails = {
  memberId: string;
  userId: string;
  role: "member" | "admin" | "society_head";
  status: "active" | "left";
  joinedAt: Date;

  userName: string | null;
  email: string | null;
  isActive: boolean | null;
  isVerified: boolean | null;
};
