import { MessageDto } from "@reactive-resume/dto";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const deleteUser = async () => {
  const response = await axios.delete<MessageDto, AxiosResponse<MessageDto>>("/user/me");

  return response.data;
};
