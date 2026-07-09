require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");
const {resume, selfDescription, jobDescription,} = require("./src/services/temp")
const generateInterviewReport = require("./src/services/ai.service.js");

connectToDb()
generateInterviewReport(resume, jobDescription, selfDescription)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});