import Login from '@/components/auth/Login';
import LogoHeader from '@/components/LogoHeader';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-gradient-to-br from-gray-800 to-indigo-900 p-6">
      {/* Logo Header */}
      <header className="w-full max-w-screen-md align-top mb-12">
        <LogoHeader />
      </header>

      {/* Login Form */}
      <main className="w-full max-w-md bg-opacity backdrop-blur-md rounded-lg p-8">
        
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;