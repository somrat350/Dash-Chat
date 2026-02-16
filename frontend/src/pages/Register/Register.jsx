import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo/Logo";
import imageIllus from "../../assets/image illus.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Send data to backend API here
  };

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* ===== Left Side (Form) ===== */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            Create Your Account
          </h2>

          <h4 className="mb-6 font-semibold text-center text-gray-500">
            Sign up for new account
          </h4>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name must be less than 30 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                    message: "Enter first and last name (letters only)",
                  },
                  validate: (value) =>
                    value.trim() === value || "No extra spaces allowed",
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter valid email",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </form>
          <p className="text-gray-500 text-xs sm:text-sm mt-4 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>

        {/* ===== Right Side (Image) ===== */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={imageIllus}
            alt="Chat Illustration"
            className="max-h-100 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
