import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../components/public/Logo";
import imageIllus from "../../assets/image illus.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import SocialLogin from "../../components/auth/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");

  const { registerWithEP, userLoading } = useAuthStore();

  const onSubmit = (data) => {
    delete data.confirmPassword;
    registerWithEP(data);
  };

  return (
    <div className="bg-primary/30 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* ===== Left Side (Form) ===== */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
            Create Your Account
          </h2>

          <h4 className="mb-6 font-semibold text-center text-gray-500">
            Sign up for new account
          </h4>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                required
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>

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

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {/* Eye Button */}
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary transition"
                >
                  {showConfirmPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 ml-1.5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-primary/90 hover:bg-primary cursor-pointer text-white py-3 rounded-lg font-semibold transition flex justify-center items-center gap-2 ${userLoading && "btn btn-disabled py-3 bg-primary"}`}
              disabled={userLoading}
            >
              {userLoading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {userLoading ? "Creating Account..." : "Create Account"}
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
          <p className="text-gray-500 text-sm sm:text-base mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Login
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

export default Register;
