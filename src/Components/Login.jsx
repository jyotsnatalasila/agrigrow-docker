import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1011/agrigrowbe/api/auth/login", {
        email,
        password,
      });
      const token = res.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        alert("Login successful");
        navigate("/home");
      } else {
        alert(res.data?.error || "Login failed!");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "Login failed!";
      alert(errorMessage);
      console.error(error);
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
          {['Home', 'Services', 'Contact', 'About'].map((link) => (
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

      {/* Login Box */}
      <div
        className="login-box"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.92)",
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
        <h2 style={{ color: "#2e7d32", marginBottom: "24px", fontSize: "24px" }}>
          Welcome to AgriGrow
        </h2>

        <form onSubmit={handleLogin}>
          <div style={{ position: "relative", margin: "12px 0" }}>
            <i
              className="fas fa-envelope"
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                fontSize: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ position: "relative", margin: "12px 0" }}>
            <i
              className="fas fa-lock"
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                fontSize: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              marginTop: "8px",
              position: "relative",
            }}
          >
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" /> Remember me
            </label>
            <a
              href={process.env.PUBLIC_URL + '#/forgotpassword'}
              style={{
                color: "#2e7d32",
                textDecoration: "underline",
                fontWeight: "bold",
                zIndex: 1,
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#388e3c")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#2e7d32")}
            >
              Forgot Password?
            </a>
          </div>

          <input
            type="submit"
            value="Login"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "12px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#388e3c",
              color: "white",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2e7d32")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#388e3c")
            }
          />

          <div style={{ marginTop: "14px", fontSize: "13px" }}>
            Don't have an account?{" "}
            <a
              href={process.env.PUBLIC_URL + '#/register'}
              style={{
                color: "#2e7d32",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Register
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

export default Login;