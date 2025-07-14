import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { signup } from "../lib/api";
const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="synthwave"
    >
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden">
        {/* signUp left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col shadow-md bg-primary/5">
          {/* Logo */}
          <div className="mb-4 flex items-center gap-2">
            <img src="./SmoothConnectLogo.svg" alt="Logo" className="w-12" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              SmoothConnect
            </span>
          </div>

          {error && (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {error?.response.data?.message || "Something went wrong"}
                </span>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold mb-1">Create an account</h2>
          <p className="mb-6 text-sm text-gray-500">
            Join SmoothConnect and start your language learning journey
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mb-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="w-full input input-bordered"
                value={signupData.fullName}
                onChange={e => {
                  setSignupData({ ...signupData, fullName: e.target.value });
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="w-full input input-bordered"
                value={signupData.email}
                onChange={e => {
                  setSignupData({ ...signupData, email: e.target.value });
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="*******"
                className="w-full input input-bordered"
                value={signupData.password}
                onChange={e => {
                  setSignupData({ ...signupData, password: e.target.value });
                }}
              />
              <p className="text-xs text-gray-400 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span>
                I agree to the{" "}
                <a
                  href="#"
                  className="text-green-300 hover:underline decoration-2 underline-offset-4 transition"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-green-300 hover:underline decoration-2 underline-offset-4 transition"
                >
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button className="btn btn-outline btn-success mt-2 group inline-flex items-center">
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </>
              ) : (
                <>
                  Continue
                  <svg
                    className="w-3.5 h-3.5 transform transition-transform duration-500 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4 4l5 4-5 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
          <p className="text-sm flex justify-center gap-1">
            <span>Already have an Account?</span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* signUp right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/Video call-amico.svg"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
