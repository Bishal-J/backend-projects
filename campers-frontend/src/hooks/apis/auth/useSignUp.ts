"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postWithoutAuth } from "@/configs/axiosConfigs";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type SignUpResponse = {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
  };
};

type ErrorResponse = {
  message: string;
  status?: string;
};

export function useSignUp(): UseMutationResult<
  SignUpResponse,
  AxiosError<ErrorResponse>,
  SignUpCredentials
> {
  return useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const res = await postWithoutAuth<SignUpResponse>(
        "api/v1/users/signup",
        credentials
      );
      return res.data; // Return res.data directly instead of res.data.body
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
}
