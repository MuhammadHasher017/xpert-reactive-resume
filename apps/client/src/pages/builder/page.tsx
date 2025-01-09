import { useCallback, useEffect } from "react";
import { LoaderFunction, redirect } from "react-router-dom";

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
  const oldHashToken = localStorage.getItem("hashToken") ?? "";

  try {
    // Get the ID from route params

    let hashToken = window.location.hash.slice(1); // Remove '#' from the hash

    if (!hashToken) {
      // Store the hash token in local storage for future use
      hashToken = localStorage.getItem("hashToken") ?? "";

      if (!hashToken) {
        console.error("No hash token found in URL or local storage.");
        return redirect("/"); // Redirect if no token is available
      }
    }

    history.replaceState(null, document.title, window.location.pathname + window.location.search);

    const builderData = await findBuilderDataById({ applicantId: hashToken });
    localStorage.setItem("hashToken", hashToken);
    // Normalize the API data
    const normalizedResume = normalizeResumeData(
      JSON.parse(builderData.message.custom_builder_parsed_resume),
    );
    // Set the normalized data in the store
    useResumeStore.setState({ resume: normalizedResume });
    useResumeStore.temporal.getState().clear();

    return normalizedResume;
  } catch (error) {
    console.log("oldHashToken", oldHashToken);
    console.error("Failed to load resume:", error);
    return redirect(`/`); // Redirect if no token is available
  }
};
