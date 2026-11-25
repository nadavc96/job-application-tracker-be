import { pool } from "../db";
import type { Queryable } from "../types/db";
import type { Application } from "../types/application";

export async function getUserApplications(
  userid: string,
): Promise<Application[]> {
  const result = await pool.query<Application>(
    `SELECT id as "appID", company_name AS "companyName", job_title AS role, status, job_url AS "url"
    FROM applications
    WHERE user_id = $1`,
    [userid],
  );

  return result.rows;
}

export async function addUserApplicationToDB(
  companyName: string,
  jobTitle: string,
  status: string,
  jobURL: string | undefined,
  userid: string,
  db: Queryable = pool,
): Promise<Application> {
  const result = await db.query<Application>(
    `INSERT INTO applications (user_id, company_name, job_title, status, job_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id AS "appID", company_name AS "companyName", job_title AS role, status, job_url AS url`,
    [userid, companyName, jobTitle, status, jobURL],
  );

  const application = result.rows[0];

  if (!application) {
    throw new Error("Failed to create application");
  }
  return application;
}

export async function deleteApplicationFromDB(
  applicationId: string,
  userid: string,
): Promise<number> {
  const result = await pool.query(
    `DELETE FROM applications WHERE id = $1 AND user_id = $2`,
    [applicationId, userid],
  );

  return result.rowCount ?? 0;
}

export async function editApplicationInDB(
  applicationId: string,
  userid: string,
  status: string | undefined,
  jobURL: string | undefined,
  db: Queryable = pool,
): Promise<number> {
  let result;

  if (status !== undefined && jobURL !== undefined) {
    result = await db.query(
      `UPDATE applications
        SET status = $1, job_url = $2, updated_at = now()
        WHERE id = $3 AND user_id = $4`,
      [status, jobURL, applicationId, userid],
    );
  } else if (status !== undefined && jobURL === undefined) {
    result = await db.query(
      `UPDATE applications
    SET status = $1, updated_at = now()
    WHERE id = $2 AND user_id = $3`,
      [status, applicationId, userid],
    );
  } else {
    result = await db.query(
      `UPDATE applications
        SET job_url = $1, updated_at = now()
        WHERE id = $2 AND user_id = $3`,
      [jobURL, applicationId, userid],
    );
  }

  return result.rowCount ?? 0;
}

export async function getApplicationStatus(
  appID: string,
  userID: string,
  db: Queryable = pool,
): Promise<string | null> {
  const result = await db.query<{ status: string }>(
    `SELECT status
    FROM applications
    WHERE id = $1 AND user_id = $2`,
    [appID, userID],
  );

  return result.rows[0]?.status ?? null;
}
