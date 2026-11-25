import { withTransaction } from "../db";
import {
  getUserApplications,
  addUserApplicationToDB,
  deleteApplicationFromDB,
  editApplicationInDB,
  getApplicationStatus,
} from "../repositories/application-repo";
import { insertStatusHistory } from "../repositories/status-history-repo";
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
  return withTransaction(async (client) => {
    const app = await addUserApplicationToDB(
      companyName,
      jobTitle,
      status,
      jobURL,
      userid,
      client,
    );

    await insertStatusHistory(app.appID, userid, status, client);

    return app;
  });
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
  return withTransaction(async (client) => {
    const current = await getApplicationStatus(applicationId, userid, client);
    if (!current) return 0;

    const updated = await editApplicationInDB(
      applicationId,
      userid,
      status,
      jobURL,
      client,
    );

    if (updated > 0 && status != undefined && status != current) {
      await insertStatusHistory(applicationId, userid, status, client);
    }

    return updated;
  });
}
