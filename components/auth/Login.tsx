"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebook, FaGoogle } from "react-icons/fa"; // For social icons

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      if (result.error) {
        setError("please check email and password");
      }
    } else if (result?.ok) {
      router.push("/main");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="relative">
          <label htmlFor="password" className="text-sm font-medium mb-1">
            Password
          </label>
          <div className="flex items-center border-none rounded-md relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a href="/" className="text-blue-600 hover:underline">
          Signup
        </a>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="border-t w-full border-gray-300"></div>
        <span className="absolute px-2 bg-white text-sm text-gray-500">Or</span>
      </div>
      <div className="space-y-2">
        <button
          type="button"
          className="w-full px-4 py-2 text-white bg-blue-800 rounded-md flex items-center justify-center space-x-2"
        >
          <FaFacebook />
          <span>Login with Facebook</span>
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 text-black bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center space-x-2"
        >
          <FaGoogle />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
