import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:1010/agrigrowbe/api/auth/register", {
        username,
        email,
        password,
      });
      // Backend returns { message: "User registered successfully" } on 200 OK
      setSuccess(res.data?.message || "Registered successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Registration failed!";
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
            src= {process.env.PUBLIC_URL +"/Images/agrigrowlogo.png"}
            alt="AgriGrow Logo"
            style={{ height: "60px" }}
          />
        </div>
        <div
          className="nav-links"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "flex-end",
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          {["Home", "Services", "Contact", "About", "Login"].map((link) => (
            <a
              key={link}
              href={`#/${link.toLowerCase()}`}
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.2)")
              }
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "none")}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Register Box */}
      <div
        className="register-box"
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
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{ color: "#2e7d32", marginBottom: "24px", fontSize: "24px" }}
        >
          Create your AgriGrow Account
        </h2>

        <form onSubmit={handleRegister} style={{ textAlign: "left" }}>
          {/* Username */}
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <FaUser
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          {/* Email */}
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <FaEnvelope
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {/* Password */}
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
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              placeholder="Confirm Password"
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
          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
          {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
          <input
            type="submit"
            value={loading ? "Registering..." : "Register"}
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

          <div style={{ marginTop: "14px", fontSize: "13px", textAlign: "center" }}>
            Already have an account?{" "}
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

        <div style={{ marginTop: "18px", fontSize: "12px", color: "#333", textAlign: "center" }}>
          Empowering Agriculture 🌾 | AgriGrow 2025
        </div>
      </div>
    </div>
  );
};

export default Register;