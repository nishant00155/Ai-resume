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

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", auth, interviewController.getAllInterviewReportsController)

/**
 * @router GET /api/interview/report/:interviewId
 * @abstraction Get an interview report by interviewId
 * @access Private
 */
interviewRouter.get(
  "/report/:interviewId",
  auth,
  interviewController.getInterviewReportByIdController,
);

module.exports = interviewRouter;
