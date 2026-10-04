import { api } from "./axios-client";
type app = {
  appID: string;
  company: string;
  role: string;
  status: string;
  url: string | null;
};

export async function addApplication(
  companyName: string,
  jobTitle: string,
  status: string,
  jobURL: string,
) {
  console.log("1");
  const response = await api({
    method: "post",
    url: "/api/applications",
    data: { companyName, jobTitle, status, jobURL },
  });
  console.log("2");

  return response.data;
}
export async function getApplications(): Promise<app[]> {
  const response = await api({
    method: "get",
    url: "/api/applications",
  });

  return response.data;
}
