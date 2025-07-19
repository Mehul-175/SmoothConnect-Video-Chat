import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { login } from "../lib/api";
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="synthwave"
    >
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden">
        {/* login left side */}
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

         <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
          <p className="mb-6 text-sm text-gray-500">
            Sign In to your account to continue your language learning journey
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mb-4">

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium m-2 label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email Id"
                className="w-full input input-bordered"
                value={loginData.email}
                onChange={e => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium m-2 label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                className="w-full input input-bordered"
                value={loginData.password}
                onChange={e => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
              />
            </div>

            {/* Submit Button */}
            <button className="btn btn-outline btn-success mt-2 group inline-flex items-center">
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </>
              ) : (
                <>
                  Log In
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
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-green-500 hover:underline">
              Create one
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

export default LoginPage;
