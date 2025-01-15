import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";
import { LoaderFunction } from "react-router-dom";

import { findBuilderDataById } from "@/client/services/resume/getbuilderdata";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

import { normalizeResumeData } from "./normalize";

export const BuilderPage = () => {
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);

  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef?.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume.data };
    (() => {
      frameRef.contentWindow.postMessage(message, "*");
    })();
  }, [frameRef, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;
    frameRef.addEventListener("load", updateResumeInFrame);
    return () => {
      frameRef.removeEventListener("load", updateResumeInFrame);
    };
  }, [frameRef]);

  // Send resume data to iframe on change of resume data
  useEffect(updateResumeInFrame, [resume.data]);

  return (
    <iframe
      ref={setFrameRef}
      title={resume.id}
      src="/artboard/builder"
      className="mt-16 w-screen"
      style={{ height: `calc(100vh - 64px)` }}
    />
  );
};

export const builderLoader: LoaderFunction<unknown> = async ({ params }) => {
  try {
    const user_id = Cookies.get("user_id") || "";
    const doctype = "Candidate";
    console.log("user_id", user_id);
    const builderData = await findBuilderDataById({ name: user_id, doctype });
    // Normalize the API data
    const normalizedResume = normalizeResumeData(
      JSON.parse(builderData.docs[0].custom_builder_parsed_resume),
    );
    // Set the normalized data in the store
    useResumeStore.setState({ resume: normalizedResume });
    useResumeStore.temporal.getState().clear();

    return normalizedResume;
  } catch (error) {
    console.error("Failed to load resume:", error);
  }
};
