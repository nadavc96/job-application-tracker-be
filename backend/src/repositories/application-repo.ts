import { pool } from "../db";
import { Application } from "../types/application";

export async function getUserApplications(
  userid: string,
): Promise<Application[]> {
  const result = await pool.query<Application>(
    `SELECT user_id AS userid, company_name AS companyName, job_title AS jobTitle, status, job_url AS jobURL
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
): Promise<Application> {
  const result = await pool.query<Application>(
    `INSERT INTO applications (user_id, company_name, job_title, status, job_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING user_id AS userid, company_name AS companyName, job_title AS jobTitle, status, job_url AS jobURL`,
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
): Promise<number> {
  let result;

  if (status !== undefined && jobURL !== undefined) {
    result = await pool.query(
      `UPDATE applications
        SET status = $1, job_url = $2
        WHERE id = $3 AND user_id = $4`,
      [status, jobURL, applicationId, userid],
    );
  } else if (status !== undefined && jobURL === undefined) {
    result = await pool.query(
      `UPDATE applications
    SET status = $1
    WHERE id = $2 AND user_id = $3`,
      [status, applicationId, userid],
    );
  } else {
    result = await pool.query(
      `UPDATE applications
        SET job_url = $1
        WHERE id = $2 AND user_id = $3`,
      [jobURL, applicationId, userid],
    );
  }

  return result.rowCount ?? 0;
}
