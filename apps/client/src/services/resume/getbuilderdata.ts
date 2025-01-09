import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const findBuilderDataById = async (data: { applicantId: string }) => {
  const response = await axios.get(`/method/job_portal.custom_apis.candidate.get_candidate_info`, {
    params: { applicant_id: data.applicantId },
  });

  return response.data;
};

export const useBuilderData = (applicantId: string, enabled = false) => {
  const {
    error,
    isLoading: loading,
    data: builderData,
  } = useQuery({
    queryKey: ["builderData", applicantId],
    queryFn: () => findBuilderDataById({ applicantId }),
    enabled: !!applicantId && enabled, // Fetch only if applicantId is provided and enabled is true
  });

  return { builderData, loading, error };
};
