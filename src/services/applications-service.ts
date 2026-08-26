import {
  getUserApplications,
  addUserApplicationToDB,
  deleteApplicationFromDB,
  editApplicationInDB,
} from "../repositories/application-repo";
import { Application } from "../types/application";

export async function getAllApplications(
  userid: string,
): Promise<Application[]> {
  return await getUserApplications(userid);
}

export async function addApplication(
  companyName: string,
  jobTitle: string,
  status: string,
  jobURL: string | undefined,
  userid: string,
): Promise<Application> {
  return await addUserApplicationToDB(
    companyName,
    jobTitle,
    status,
    jobURL,
    userid,
  );
}

export async function deleteApplication(
  applicationId: string,
  userid: string,
): Promise<number> {
  return await deleteApplicationFromDB(applicationId, userid);
}

export async function editApplication(
  applicationId: string,
  userid: string,
  status: string | undefined,
  jobURL: string | undefined,
): Promise<number> {
  return await editApplicationInDB(applicationId, userid, status, jobURL);
}
