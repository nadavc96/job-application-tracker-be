export type APPLICATION = {
  appID: string;
  companyName: string;
  role: string;
  status: string;
  url: string | null;
};

export const STATUSES = ["applied", "interview", "offer", "rejected"];
