"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postWithoutAuth } from "@/configs/axiosConfigs";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// The structure returned by the API
type RawApiResponse = {
  status: string;
  token: string;
  body: {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
    __v?: number;
  };
};

// The final shape you want to return from the hook
type SignInResponse = {
  token: string;
  user: RawApiResponse["body"];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type ErrorResponse = {
  message: string;
  status?: string;
};

export function useSignIn(): UseMutationResult<
  SignInResponse,
  AxiosError<ErrorResponse>,
  SignInCredentials
> {
  return useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const res = await postWithoutAuth<RawApiResponse>(
        "api/v1/users/signin",
        credentials
      );

      return {
        token: res.data.token,
        user: res.data.body,
      };
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
}
