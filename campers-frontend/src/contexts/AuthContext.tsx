"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetUserProfile } from "@/hooks/apis/auth/useGetUserProfile";
import { useSignIn } from "@/hooks/apis/auth/useSignIn";
import { useSignUp } from "@/hooks/apis/auth/useSignUp";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => void;
  signOut: () => void;
  isAuthenticating: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const { mutate: signInMutate, isPending: signInPending } = useSignIn();
  const { mutate: signUpMutate, isPending: signUpPending } = useSignUp();

  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserProfile(!!token);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Refetch user if token exists
  useEffect(() => {
    if (token) {
      refetchUser();
    }
  }, [token]);

  // Set user when userData is fetched
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const signIn = (email: string, password: string) => {
    signInMutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(data.user);
          toast.success("Signed in successfully!");
          router.push("/home");
        },
        onError: () => {
          toast.error("Login failed.");
        },
      }
    );
  };

  const signUp = (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    signUpMutate(
      { name, email, password, passwordConfirm },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(data.user);
          toast.success("Signed up successfully!");
          router.push("/home");
        },
        onError: () => {
          toast.error("Sign up failed.");
        },
      }
    );
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.info("Signed out.");
    router.push("/");
  };

  const value: AuthContextType = {
    user,
    loading: userLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticating: signInPending || signUpPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
