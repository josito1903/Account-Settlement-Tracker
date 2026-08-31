import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);

      console.log("Login response:", response);
      console.log("User role:", response.user?.role);

      if (response.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Accounts Settlement Tracker
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "30px",
          }}
        >
          Sign in to continue
        </p>

        {error && (
          <div
            style={{
              color: "#d32f2f",
              background: "#ffebee",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2864e8",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account?{" "}

          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#2864e8",
              cursor: "pointer",
            }}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;