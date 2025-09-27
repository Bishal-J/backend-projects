"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { signUpSchema } from "@/validations/authValidators";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUp() {
  const { signUp, isAuthenticating } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      signUp(
        values.name,
        values.email,
        values.password,
        values.passwordConfirm
      );
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-2xl shadow-lg border border-muted/30">
        <h2 className="text-3xl font-bold text-foreground text-center">
          Sign Up
        </h2>
        <p className="text-center text-muted">
          Create your account to get started
        </p>

        <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              className={`w-full px-4 py-2 rounded-xl border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-muted/30"
              } bg-[var(--surface)] text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              {...formik.getFieldProps("passwordConfirm")}
              className={`w-full px-4 py-2 rounded-xl border ${
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
                  ? "border-red-500"
                  : "border-muted/30"
              } bg-[var(--surface)] text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`}
            />
            {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.passwordConfirm}
                </div>
              )}
          </div>

          <button
            type="submit"
            disabled={isAuthenticating || formik.isSubmitting}
            className="w-full py-3 bg-accent text-white font-medium rounded-xl shadow hover:opacity-90 transition"
          >
            {isAuthenticating || formik.isSubmitting
              ? "Signing Up..."
              : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-accent font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
