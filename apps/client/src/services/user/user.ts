import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAuthStore } from "@/client/stores/auth";

export const fetchUser = async () => {
  // const response = await axios.get<UserDto | undefined, AxiosResponse<UserDto | undefined>>(
  //   "/user/me",
  // );

  return {
    id: "cm2ooirzd0oxezg05hn79xzaw",
    name: "Muhammad Hasher",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocLY_aY90BiWheIoyTbjMk_z5FlvnEJ3pAQq_6-GD7vOsb_uoIk3=s96-c",
    username: "muhammadhasher017",
    email: "muhammadhasher017@gmail.com",
    locale: "en-US",
    emailVerified: true,
    twoFactorEnabled: false,
    createdAt: "2024-10-25T11:59:09.863Z",
    updatedAt: "2024-10-25T11:59:09.863Z",
  };
};

export const useUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    setUser(user ?? null);
  }, [user, setUser]);

  return { user: user, loading, error };
};
