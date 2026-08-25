import { pool } from "../db";

export async function getUserApplications(userid: string) {
  const result = await pool.query(
    `SELECT *
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
) {
  await pool.query(
    `INSERT INTO applications (user_id, company_name, job_title, status, job_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [userid, companyName, jobTitle, status, jobURL],
  );
}

export async function deleteApplicationFromDB(
  applicationId: string,
  userid: string,
) {
  const result = await pool.query(
    `DELETE FROM applications WHERE id = $1 AND user_id = $2`,
    [applicationId, userid],
  );

  return result.rowCount;
}

export async function editApplicationInDB(
  applicationId: string,
  userid: string,
  status: string | undefined,
  jobURL: string | undefined,
) {
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
