import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.username) errs.username = "Please enter your username";
    if (!formData.password) errs.password = "Please enter your password";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signin", formData);
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/list");
      } else {
        const msg = (res.data && res.data.message) || "Invalid username or password";
        setMessage(msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = err.response && err.response.data ? err.response.data : "Error logging in";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">EM</div>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">Welcome back</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Sign in to continue to Employee Management</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your username"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.username ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.password ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {message && <p className="text-center mt-4 text-sm text-red-600">{message}</p>}

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
