import { t } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";

// PUT request to update the candidate
export const updateCandidate = async (candidateId: string, data: Record<string, any>) => {
  // Replace URL with your backend endpoint
  const response = await axios.put(`/resource/Candidate/${candidateId}`, data);

  return response.data; // Return the updated data
};

export const useUpdateCandidate = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateCandidateFn,
  } = useMutation({
    mutationFn: ({ candidateId, data }: { candidateId: string; data: Record<string, any> }) =>
      updateCandidate(candidateId, data),
    onError: (error) => {
      const message = error.message || "An unexpected error occurred.";

      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: message,
      });
    },
  });

  return { updateCandidate: updateCandidateFn, loading, error };
};
