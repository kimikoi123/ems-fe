"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@/components/snackbar/Snackbar";
import axios from "axios";
import { API_CONFIG } from "../constants/config";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    setIsError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEmailValid && password) {
      try {
        const response = await axios.post(`${API_CONFIG.url}/login`, {
          username: email,
          password: password,
        });

        const data = response.data;
        //Save token
        router.push("/user");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setSnackbarMessage("Login failed");
        setIsSnackbarOpen(true);
        setIsError(true);
      }
    } else {
      setSnackbarMessage("Invalid email or password");
      setIsSnackbarOpen(true);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                isEmailValid ? "border-gray-300" : "border-red-500"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="johndoe@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                !email || !password
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
              }`}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Snackbar
        message={snackbarMessage}
        isOpen={isSnackbarOpen}
        onClose={handleSnackbarClose}
        duration={3000}
        isError={isError}
      />
    </div>
  );
};

export default Login;
