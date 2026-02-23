import { useState } from "react";
import { useForm } from "react-hook-form";
import imageIllus from "../../assets/image illus.png";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Logo from "../../components/public/Logo";
import SocialLogin from "../../components/auth/SocialLogin";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggingIn, loginUser } = useAuthStore();

  const onSubmit = (data) => {
    loginUser(data);
  };
  return (
    <div className="bg-primary/30 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* ===== Left Side (Form) ===== */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            Welcome Back! Please login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                required
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        "Password must contain at least 1 uppercase and 1 lowercase letter",
                    },
                  })}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />

                {/* Eye Button */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary transition"
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>
            <p className="text-right mt-2">
              <Link
                to="/auth/forgot-password"
                className="text-primary text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
            <button
              type="submit"
              className={`w-full bg-primary/90 hover:bg-primary cursor-pointer text-white py-3 rounded-lg font-semibold transition flex justify-center items-center gap-2 ${isLoggingIn && "btn btn-disabled py-3 bg-primary"}`}
              disabled={isLoggingIn}
            >
              {isLoggingIn && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {isLoggingIn ? "LoggingIn..." : "Login"}
            </button>
          </form>

          {/* Social Login  */}
          {/* or  */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm font-medium">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          {/* sign up with social  */}
          <SocialLogin />
          <p className="text-gray-500 text-xs sm:text-sm mt-4 text-center">
            Are you new to our website?{" "}
            <Link
              to="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
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

export default Login;
