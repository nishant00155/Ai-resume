const express = require("express");
const app =express();
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:3000",          // local dev
        "https://arambh.site",            // custom domain
        "https://ai-resume-eight-sigma.vercel.app" // Vercel deployment
    ],
    credentials: true
}));
/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth",authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app;