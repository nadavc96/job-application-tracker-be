import { Request, Response } from "express";
import * as applicationService from "../services/applications-service";
import { AppError } from "../app-error";

export async function getAllApplications(req: Request, res: Response) {
  const applications = await applicationService.getAllApplications(req.userid!);

  return res.status(200).json(applications);
}

export async function addApplication(req: Request, res: Response) {
  const { companyName, jobTitle, status, jobURL } = req.body;
  const userid = req.userid!;

  const application = await applicationService.addApplication(
    companyName,
    jobTitle,
    status,
    jobURL,
    userid,
  );

  return res.status(201).json(application);
}

export async function deleteApplication(
  req: Request<{ id: string }>,
  res: Response,
) {
  const applicationId = req.params.id;
  const userid = req.userid!;

  const deletedRows = await applicationService.deleteApplication(
    applicationId,
    userid,
  );

  if (deletedRows === 0) {
    throw new AppError("Application not found.", 404);
  }

  return res.status(200).json({ message: "Application removed successfully." });
}

export async function editApplication(
  req: Request<{ id: string }>,
  res: Response,
) {
  const { status, jobURL } = req.body;
  const applicationId = req.params.id;
  const userid = req.userid!;

  const updatedRows = await applicationService.editApplication(
    applicationId,
    userid,
    status,
    jobURL,
  );

  if (updatedRows === 0) {
    throw new AppError("Application not found.", 404);
  }

  return res.status(200).json({ message: "Appliction edited successfully." });
}
