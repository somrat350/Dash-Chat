import React from "react";

import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router";

const ForgotPassword = () => {
  const { resetPassword, userLoading } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    resetPassword(data.email);
    reset();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter valid email",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={userLoading}
            className={`w-full py-3 rounded-lg text-white cursor-pointer ${
              userLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
            }`}
          >
            {userLoading ? "Sending..." : "Send Password Reset Email"}
          </button>
        </form>
        <div>
          <p className="text-sm text-right mt-4">
            Remember your password?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;