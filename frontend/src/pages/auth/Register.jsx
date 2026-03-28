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
    <div className="relative min-h-screen overflow-hidden bg-base-100 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute -top-24 left-8 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl overflow-hidden rounded-3xl border border-base-300/70 bg-base-200/80 shadow-2xl backdrop-blur-sm">
        <div className="hidden lg:flex lg:w-[48%] items-center justify-center border-r border-base-300/70 bg-linear-to-br from-base-200 to-base-300 p-10">
          <div className="mx-auto max-w-md text-center">
            <img
              src={imageIllus}
              alt="Chat Illustration"
              className="mx-auto max-h-[320px] w-full object-contain"
            />
            <h3 className="mt-6 text-2xl font-semibold text-base-content">
              Create your secure DashChat space
            </h3>
            <p className="mt-2 text-sm text-base-content/70">
              Register once and start messaging, calling, and collaborating in a
              clean, responsive experience.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[52%] p-5 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-5 flex justify-center lg:justify-start">
              <Logo />
            </div>

            <h1 className="text-center text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-left">
              Create your account
            </h1>
            <p className="mt-2 text-center text-sm text-base-content/70 lg:text-left">
              Join DashChat and connect with your people in seconds.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
              <label className="form-control w-full">
                <span className="mb-1.5 text-sm font-medium text-base-content/80">
                  Full name
                </span>
                <input
                  type="text"
                  placeholder="Your full name"
                  {...register("name", { required: "Name is required" })}
                  className={`input input-bordered h-12 w-full bg-base-100/85 ${
                    errors.name
                      ? "input-error"
                      : "border-base-300 focus:border-primary"
                  }`}
                />
                {errors.name && (
                  <span className="mt-1 text-sm text-error">
                    {errors.name.message}
                  </span>
                )}
              </label>

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
                    placeholder="Set a strong password"
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

              <label className="form-control w-full">
                <span className="mb-1.5 text-sm font-medium text-base-content/80">
                  Confirm password
                </span>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className={`input input-bordered h-12 w-full pr-12 bg-base-100/85 ${
                      errors.confirmPassword
                        ? "input-error"
                        : "border-base-300 focus:border-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 transition hover:text-primary"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="mt-1 text-sm text-error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>

              <button
                type="submit"
                disabled={userLoading}
                className={`btn h-12 w-full rounded-xl border-0 bg-primary text-primary-content transition hover:bg-primary/90 ${
                  userLoading ? "btn-disabled" : ""
                }`}
              >
                {userLoading && (
                  <span className="loading loading-spinner loading-sm" />
                )}
                {userLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="divider my-6 text-xs uppercase tracking-wider text-base-content/50">
              or continue with
            </div>

            <SocialLogin />

            <p className="mt-6 text-center text-sm text-base-content/80">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-semibold text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
