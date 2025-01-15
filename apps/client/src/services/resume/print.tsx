import { t } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";

// POST request to generate the resume
export const printResume = async (data: { resume: object }) => {
  // Replace URL with your backend endpoint
  const response = await axios.post<Blob>(
    "http://192.168.11.140:8000/api/v1/generate-resume/",
    data,
    {
      responseType: "blob", // Ensure the response is treated as a Blob
    },
  );

  // Create a blob URL from the response
  const blobUrl = URL.createObjectURL(response.data);

  return blobUrl;
};

export const usePrintResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: printResumeFn,
  } = useMutation({
    mutationFn: printResume,
    onError: (error) => {
      const message = error.message || "An unexpected error occurred.";

      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: message,
      });
    },
  });

  return { printResume: printResumeFn, loading, error };
};
