import Login from "@/components/auth/Login";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-gradient-to-t from-gray-800 to-blue-600 p-6">
      {/* Login Form */}
      <main className="w-full max-w-md bg-opacity backdrop-blur-md rounded-lg p-8">
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;
