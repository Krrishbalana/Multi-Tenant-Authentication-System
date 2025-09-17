import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen overflow-hidden bg-neutral-50 relative">
      {/* Left Half - Branding */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center
          transition-transform duration-1000 ease-in-out
          ${isLogin ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="text-center px-8">
          <h1 className="text-9xl mx-5 font-extrabold tracking-tighter text-black mb-4">
            Multi-Tenant
            <br />
            Authentication
            <br />
            System
          </h1>
          <p className="text-xl font-semibold text-black">
            DIVINE Lab, IIT Delhi
          </p>
        </div>
      </div>

      {/* Right Half - Auth Form */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center
          transition-transform duration-500 ease-in-out
          ${isLogin ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="w-full max-w-md px-8">
          {isLogin ? (
            <Login toggleForm={() => setIsLogin(false)} />
          ) : (
            <Signup toggleForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
