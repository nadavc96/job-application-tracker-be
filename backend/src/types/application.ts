export type Application = {
  id: string;
  userid: string;
  companyName: string;
  jobTitle: string;
  status: "applied" | "interview" | "rejected" | "accepted";
  jobURL: string | undefined;
};
