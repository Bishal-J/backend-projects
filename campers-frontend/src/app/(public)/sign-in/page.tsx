"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { signInSchema } from "@/validations/authValidators";
import { useAuth } from "@/contexts/AuthContext";

export default function SignIn() {
  const { signIn, isAuthenticating } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      signIn(values.email, values.password);
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-2xl shadow-lg border border-muted/30">
        <h2 className="text-3xl font-bold text-foreground text-center">
          Sign In
        </h2>
        <p className="text-center text-muted">
          Enter your credentials to access your account
        </p>

        <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className={`w-full px-4 py-2 rounded-xl border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-muted/30"
              } bg-[var(--surface)] text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className={`w-full px-4 py-2 rounded-xl border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-muted/30"
              } bg-[var(--surface)] text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-3 bg-accent text-white font-medium rounded-xl shadow hover:opacity-90 transition"
          >
            {isAuthenticating ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-muted">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-accent font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
