import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md bg-white px-6 py-8 sm:px-8">
      <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
      <p className="mt-2 text-sm text-gray-600">
        Please enter your details to log in.
      </p>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="form-input"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Password
          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="form-input pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </span>
        </label>

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          className="font-semibold text-purple-600 hover:text-purple-800"
          onClick={() => setCurrentPage("signup")}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
