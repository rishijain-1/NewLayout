'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaEye, FaEyeSlash, FaLanguage } from "react-icons/fa"; // Updated icons

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  designation: string;
  language: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const sendData = {
      name: data.name,
      email: data.email,
      language: "en",
      password: data.password,
      password_confirmation: data.password_confirmation,
      designation: data.designation,
    };
    console.log("client",sendData);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      if (res.ok) {
        const message = await res.json();
        alert(message.message);
        reset();
        router.push("/login");
      } else {
        const error = await res.json();
        setErrorMessage(error.message || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Registration error:", error); // Logging the error
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Name Field */}
        <div className="relative">
          <label htmlFor="name" className="flex items-center text-sm font-medium mb-1">
            <FaUser className="text-gray-600 mr-2" />
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div className="relative">
          <label htmlFor="email" className="flex items-center text-sm font-medium mb-1">
            <FaEnvelope className="text-gray-600 mr-2" />
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Designation Field */}
        <div className="relative">
          <label htmlFor="designation" className="flex items-center text-sm font-medium mb-1">
            <FaBriefcase className="text-gray-600 mr-2" />
            Designation
          </label>
          <input
            type="text"
            id="designation"
            placeholder="Enter your designation"
            {...register("designation", { required: "Designation is required" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
        </div>

        {/* Language Field */}
        {/* Password Field */}
        <div className="relative">
          <label htmlFor="password" className="flex items-center text-sm font-medium mb-1">
            <FaLock className="text-gray-600 mr-2" />
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                message:
                  "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 pr-10"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 mt-3 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <label htmlFor="password_confirmation" className="flex items-center text-sm font-medium mb-1">
            <FaLock className="text-gray-600 mr-2" />
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="password_confirmation"
            placeholder="Confirm your password"
            {...register("password_confirmation", {
              validate: (value: string) => value === getValues("password") || "Passwords do not match",
              required: "Please confirm your password",
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 pr-10"
          />
          <button
            type="button"
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 mt-3 text-gray-600"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
          )}
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {/* Submit Button */}
        <div className="relative">
          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>

        {/* Link to Login */}
        <div className="text-center text-gray-500 text-sm">
          Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
