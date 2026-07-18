import {
  getInterviewReportById,
  getAllInterviewReports,
  generateInterviewReport,
} from "../services/interview.api";
import { useCallback, useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context.jsx";
import { useParams } from "react-router-dom";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReports, reports, setReport } =
    context;

  const genrateReport = useCallback(
    async ({ jobDescription, selfDescription, resumeFile }) => {
      setLoading(true);
      let response = null;
      try {
        response = await generateInterviewReport({
          jobDescription,
          selfDescription,
          resumeFile,
        });
        setReport(response.interviewReport);
      } catch (error) {
        console.error("Error generating interview report:", error);
      } finally {
        setLoading(false);
      }
      return response?.interviewReport;
    },
    [setLoading, setReport],
  );

  const getReportById = useCallback(
    async (interviewId) => {
      setLoading(true);
      try {
        const response = await getInterviewReportById(interviewId);
        setReport(response.interviewReport);
        return response?.interviewReport;
      } catch (error) {
        console.error("Error fetching interview report by ID:", error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport],
  );

  const getReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      const normalizedReports =
        Array.isArray(response?.interviewReports) ? response.interviewReports
        : Array.isArray(response?.InterviewReports) ? response.InterviewReports
        : [];
      setReports(normalizedReports);
      return normalizedReports;
    } catch (error) {
      console.error("Error fetching interview reports:", error);
      setReports([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [getReportById, getReports, interviewId]);
  return { loading, report, reports, genrateReport, getReportById, getReports };
};
