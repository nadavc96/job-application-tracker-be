import { api } from "./axios-client";
import { type APPLICATION } from "@/types/application";

export async function addApplicationToDB(
  companyName: string,
  jobTitle: string,
  status: string,
  jobURL: string,
) {
  const response = await api({
    method: "post",
    url: "/api/applications",
    data: { companyName, jobTitle, status, jobURL },
  });

  return response.data;
}
export async function getApplications(): Promise<APPLICATION[]> {
  const response = await api({
    method: "get",
    url: "/api/applications",
  });

  return response.data;
}

export async function editApplication(
  appID: string,
  status: string,
  jobURL: string | null,
) {
  const response = await api({
    method: "patch",
    url: `/api/applications/${appID}`,
    data: { status, jobURL },
  });

  return response.data;
}

export async function deleteApplicationFromDB(appID: string) {
  const response = await api({
    method: "delete",
    url: `/api/applications/${appID}`,
  });

  return response.data;
}
