import { Request, Response } from "express";

export async function getAllApplications(req: Request, res: Response) {
  try {
    const applications = await getUserApplications(req.userid);

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to fetch applications." });
  }
}

export async function addApplication(req: Request, res: Response) {
  const { companyName, jobTitle, status, jobURL } = req.body;
  const userid = req.userid;

  try {
    await addUserApplicationToDB(companyName, jobTitle, status, jobURL, userid);

    return res.status(201).json({ message: "Application added successfully." });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to add application." });
  }
}

export async function deleteApplication(req: Request, res: Response) {
  const applicationId = req.params.id;
  const userid = req.userid;

  try {
    await deleteApplicationFromDB(applicationId, userid);

    return res
      .status(200)
      .json({ message: "Application removed successfully." });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to delete application." });
  }
}

export async function editApplication(req: Request, res: Response) {
  const { status, jobURL } = req.body;
  const applicationId = req.params.id;
  const userid = req.userid;

  try {
    await editApplicationInDB(applicationId, userid, status, jobURL);

    return res.status(200).json({ message: "Appliction edited successfully." });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed To Edit Application." });
  }
}
