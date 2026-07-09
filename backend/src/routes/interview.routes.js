const {router} = require("express");
const {auth} = require("../middlewares/auth.middleware");
const interviewRouter = router();

/**
 * @router POST /api/interview
 * @abstraction Generate an interview report based on the resume and job description
 * @access Private
 */
interviewRouter.post("/", auth)