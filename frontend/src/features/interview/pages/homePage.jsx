import React from "react";
import "../style/home.scss"

const home = () => {
  return (
    <main className="home">
      <div className="left">
        <textarea
          name="jobDescription"
          id="jobDescription"
          placeholder="Enter job description here..."
        ></textarea>
      </div>
      <div className="right">
        <div className="input-group">
          <label htmlFor="resume">upload resume in pdf format only</label>
          <input type="file" name="resume" id="resume" accept=".pdf" />
        </div>
        <div className="input-group">
          <label htmlFor="selfDescription">describe yourself </label>
          <input
            type="text"
            name="selfDescription"
            id="selfDescription"
            accept=".pdf"
          />
        </div>
        <button className="genrate-btn">Genrate Interview report</button>
      </div>
    </main>
  );
};

export default home;
