"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getWithAuth, getWithoutAuth } from "@/configs/axiosConfigs";

type ApiResponse<T> = {
  body: T;
  message: string;
  status: string;
};

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
};

export function useGetUserProfile(
  isAuthenticated: boolean
): UseQueryResult<UserProfile, Error> {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await getWithAuth<ApiResponse<UserProfile>>(
        "api/v1/users/me"
      );
      return res.data.body;
    },
    enabled: isAuthenticated,
  });
}
