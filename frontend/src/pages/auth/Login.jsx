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

  const { userLoading, loginWithEP } = useAuthStore();

  const onSubmit = (data) => {
    loginWithEP(data);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-100 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl overflow-hidden rounded-3xl border border-base-300/70 bg-base-200/80 shadow-2xl backdrop-blur-sm">
        <div className="w-full lg:w-[52%] p-5 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-5 flex justify-center lg:justify-start">
              <Logo />
            </div>

            <h1 className="text-center text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-left">
              Welcome back to DashChat
            </h1>
            <p className="mt-2 text-center text-sm text-base-content/70 lg:text-left">
              Login and continue your real-time conversations.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
              <label className="form-control w-full">
                <span className="mb-1.5 text-sm font-medium text-base-content/80">
                  Email address
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className={`input input-bordered h-12 w-full bg-base-100/85 ${
                    errors.email
                      ? "input-error"
                      : "border-base-300 focus:border-primary"
                  }`}
                />
                {errors.email && (
                  <span className="mt-1 text-sm text-error">
                    {errors.email.message}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <span className="mb-1.5 text-sm font-medium text-base-content/80">
                  Password
                </span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                    className={`input input-bordered h-12 w-full pr-12 bg-base-100/85 ${
                      errors.password
                        ? "input-error"
                        : "border-base-300 focus:border-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 transition hover:text-primary"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="mt-1 text-sm text-error">
                    {errors.password.message}
                  </span>
                )}
              </label>

              <div className="flex items-center justify-end">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className={`btn h-12 w-full rounded-xl border-0 bg-primary text-primary-content transition hover:bg-primary/90 ${
                  userLoading ? "btn-disabled" : ""
                }`}
                disabled={userLoading}
              >
                {userLoading && (
                  <span className="loading loading-spinner loading-sm" />
                )}
                {userLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="divider my-6 text-xs uppercase tracking-wider text-base-content/50">
              or continue with
            </div>

            <SocialLogin />

            <p className="mt-6 text-center text-sm text-base-content/80">
              New here?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-primary hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-[48%] items-center justify-center border-l border-base-300/70 bg-linear-to-br from-base-200 to-base-300 p-10">
          <div className="mx-auto max-w-md text-center">
            <img
              src={imageIllus}
              alt="Chat Illustration"
              className="mx-auto max-h-[320px] w-full object-contain"
            />
            <h3 className="mt-6 text-2xl font-semibold text-base-content">
              Fast, secure, and personal chats
            </h3>
            <p className="mt-2 text-sm text-base-content/70">
              Keep your conversations organized with real-time messaging, calls,
              and a clean dashboard experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
