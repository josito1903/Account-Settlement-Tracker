import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await login(
        form.email,
        form.password
      );

      const loggedInUser = response.user;

      if (loggedInUser?.role === "admin") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        navigate("/user/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Brand side */}
        <div className="auth-brand">
          <div className="auth-logo">AST</div>

          <h1>
            Accounts
            <br />
            Settlement Tracker
          </h1>

          <p>
            Manage invoices, payments, customers,
            vendors and settlements from one secure
            platform.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <span className="auth-feature-icon">
                ✓
              </span>
              Secure account management
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">
                ₹
              </span>
              Track payments and balances
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">
                ✓
              </span>
              Monitor settlement status
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">

            <div className="auth-form-header">
              <h2>Welcome back</h2>
              <p>
                Sign in to continue to your account.
              </p>
            </div>

            {error && (
              <div className="auth-message auth-error">
                {error}
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleLogin}
            >
              <div className="auth-field">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
              >
                Create one
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;