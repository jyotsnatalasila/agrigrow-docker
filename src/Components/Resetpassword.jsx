import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
    const res = await axios.post(
  `http://ec2-13-62-223-118.eu-north-1.compute.amazonaws.com:1010/agrigrowbe/api/password/reset?token=${encodeURIComponent(token)}`,
  { password: newPassword }
);

      setSuccess(res.data?.message || "Password reset successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Password reset failed!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        backgroundImage: `url("${process.env.PUBLIC_URL}/Images/loginbg.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          backgroundColor: "rgba(34, 70, 34, 0.6)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        <div className="logo" style={{ flexShrink: 0 }}>
          <img
            src={process.env.PUBLIC_URL +"/Images/agrigrowlogo.png"}
            alt="AgriGrow Logo"
            style={{ height: "60px" }}
          />
        </div>
      </div>

      {/* Reset Password Form */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "40px 30px",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 100, 0, 0.25)",
          width: "430px",
          maxWidth: "90vw",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "15px",
        }}
      >
        <h2 style={{ color: "#2e7d32", marginBottom: "20px", fontSize: "24px" }}>
          Set a New Password
        </h2>

        <form onSubmit={handleResetPassword}>
          {/* New Password */}
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <FaLock
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 10px 10px 36px",
                fontSize: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <FaLock
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 10px 10px 36px",
                fontSize: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          {success && <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>}

          <input
            type="submit"
            value={loading ? "Resetting..." : "Reset Password"}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: loading ? "#bdbdbd" : "#388e3c",
              color: "white",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#2e7d32";
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#388e3c";
            }}
          />

          <div style={{ marginTop: "14px", fontSize: "13px" }}>
            Remember your password?{" "}
            <a
              href={process.env.PUBLIC_URL + '/#/login'}
              style={{
                color: "#2e7d32",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Login
            </a>
          </div>
        </form>

        <div style={{ marginTop: "18px", fontSize: "12px", color: "#333" }}>
          Empowering Agriculture 🌾 | AgriGrow 2025
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
