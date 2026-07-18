import "../style/home.scss";
import "../style/loading.scss";
import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useinterview";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, genrateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const handleGenrateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];

    if (!resumeFile) {
      console.error("Please upload a resume before generating the report.");
      return;
    }

    const data = await genrateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    if (!data || !data._id) {
      console.error(
        "Interview report generation failed or returned no ID",
        data,
      );
      return;
    }

    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main>
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="left">
        <textarea
          name="jobDescription"
          id="jobDescription"
          placeholder="Enter job description here..."
          onChange={(e) => {
            setJobDescription(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="right">
        <div className="input-group">
          <label htmlFor="resume">upload resume in pdf format only</label>
          <input
            ref={resumeInputRef}
            type="file"
            name="resume"
            id="resume"
            accept=".pdf"
          />
        </div>
        <div className="input-group">
          <label htmlFor="selfDescription">describe yourself </label>
          <textarea
            onChange={(e) => {
              setSelfDescription(e.target.value);
            }}
            type="text"
            name="selfDescription"
            id="selfDescription"
            accept=".pdf"
          ></textarea>
        </div>
        <button onClick={handleGenrateReport} className="genrate-btn">
          Genrate Interview report
        </button>
      </div>
    </main>
  );
};

export default Home;
