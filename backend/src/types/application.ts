export type Application = {
  id: string;
  userid: string;
  companyName: string;
  jobTitle: string;
  status: "applied" | "interview" | "offer" | "rejected" | "accepted";
  jobURL: string | undefined;
};
