import { Request, Response } from "express";
import * as applicationService from "../services/applications-service";

export async function getAllApplications(req: Request, res: Response) {
  try {
    const applications = await applicationService.getAllApplications(
      req.userid!,
    );

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to fetch applications." });
  }
}

export async function addApplication(req: Request, res: Response) {
  const { companyName, jobTitle, status, jobURL } = req.body;
  const userid = req.userid!;

  try {
    const application = await applicationService.addApplication(
      companyName,
      jobTitle,
      status,
      jobURL,
      userid,
    );

    return res.status(201).json(application);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to add application." });
  }
}

export async function deleteApplication(
  req: Request<{ id: string }>,
  res: Response,
) {
  const applicationId = req.params.id;
  const userid = req.userid!;

  try {
    const deletedRows = await applicationService.deleteApplication(
      applicationId,
      userid,
    );

    if (deletedRows === 0) {
      return res.status(404).json({
        error: "Application not found.",
      });
    }

    return res
      .status(200)
      .json({ message: "Application removed successfully." });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to delete application." });
  }
}

export async function editApplication(
  req: Request<{ id: string }>,
  res: Response,
) {
  const { status, jobURL } = req.body;
  const applicationId = req.params.id;
  const userid = req.userid!;

  try {
    const updatedRows = await applicationService.editApplication(
      applicationId,
      userid,
      status,
      jobURL,
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        error: "Application not found.",
      });
    }

    return res.status(200).json({ message: "Appliction edited successfully." });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed To Edit Application." });
  }
}
