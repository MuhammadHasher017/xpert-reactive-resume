import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const findBuilderDataById = async (data: { name: string; doctype: string }) => {
  const response = await axios.get("method/frappe.desk.form.load.getdoc?", {
    params: { doctype: data.doctype, name: data.name },
  });

  return response.data;
};

export const useBuilderData = (name: string, doctype: string, enabled = false) => {
  const {
    error,
    isLoading: loading,
    data: builderData,
  } = useQuery({
    queryKey: ["builderData", name, doctype],
    queryFn: () => findBuilderDataById({ name, doctype }),
    enabled: !!name && !!doctype && enabled, // Fetch only if both applicantId and doctype are provided and enabled is true
  });

  return { builderData, loading, error };
};
