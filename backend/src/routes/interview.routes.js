const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");
const interviewController = require("../controller/interview.controller");
const { upload } = require("../middlewares/file.middleware");

const interviewRouter = Router();
/**
 * @router POST /api/interview
 * @abstraction Generate an interview report based on the resume and job description
 * @access Private
 */
interviewRouter.post(
  "/",
  auth,
  upload.single("resume"),
  interviewController.generateInterviewReportController,
);

module.exports = interviewRouter;
