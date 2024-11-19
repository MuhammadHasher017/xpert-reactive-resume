import { authResponseSchema, UserDto } from "@reactive-resume/dto";
import { LoaderFunction, redirect } from "react-router-dom";

import { useAuthStore } from "@/client/stores/auth";

export const authLoader: LoaderFunction<UserDto> = async ({ request }) => {
  const status = new URL(request.url).searchParams.get("status");

  const { success } = authResponseSchema.pick({ status: true }).safeParse({ status });

  if (!success) return redirect("/auth/login");

  if (status === "2fa_required") {
    return redirect("/auth/verify-otp");
  }

  const user = {
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
    // provider: ["google],
  };

  if (status === "authenticated") {
    useAuthStore.setState({ user });

    return redirect("/dashboard");
  }
};
