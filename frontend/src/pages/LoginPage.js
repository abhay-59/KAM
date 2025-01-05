import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please log in to your account
          </p>
        </div>

        {error && (
          <div className="bg-gray-200 border border-gray-400 text-gray-800 px-4 py-3 rounded-md">
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="mt-1 block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="you@example.com"
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
                name="password"
                value={password}
                onChange={onChange}
                required
                className="mt-1 block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 text-white bg-gray-800 hover:bg-gray-700 rounded-lg font-medium text-sm shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            New user?{" "}
            <Link
              to="/register"
              className="font-bold text-gray-800 hover:text-gray-600"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
