import React, { useState } from "react";
import axios from "axios";

// Base URL configuration
const API_BASE_URL = 'http://const res = await axios.post(
  `http://ec2-13-62-223-118.eu-north-1.compute.amazonaws.com:1010/agrigrowbe/api/password/reset?token=${encodeURIComponent(token)}`,
  { password: newPassword }
);
:1010/agrigrowbe';

function Contact() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    subject: "", 
    message: "" 
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    
    try {
      console.log("Sending contact form data:", formData);
      
      const response = await axios.post(`${API_BASE_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      
      console.log("Contact form response:", response.data);
      
      let successMessage = "Your message has been sent successfully! ";
      
      // Check email sending status
      if (response.data.adminEmailSent === false) {
        successMessage += "(But admin notification failed) ";
      }
      if (response.data.userAckSent === false) {
        successMessage += "(But auto-reply failed) ";
      }
      
      if (response.data.adminEmailSent && response.data.userAckSent) {
        successMessage += "You should receive an auto-reply confirmation email shortly.";
      }
      
      setStatus(successMessage);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("Failed to send message. Please try again.");
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
        minHeight: "100vh",
        color: "#2e4c20",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "rgba(34, 70, 34, 0.85)",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
          flexWrap: "wrap",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div className="logo" style={{ flexShrink: 0 }}>
          <img
            src={process.env.PUBLIC_URL + "/Images/agrigrowlogo.png"}
            alt="AgriGrow Logo"
            style={{ height: 60 }}
          />
        </div>
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          {["Home", "Services", "About", "Contact"].map((link) => (
            <a
              key={link}
              href={`${process.env.PUBLIC_URL}/#/${link.toLowerCase()}`}
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                padding: "10px 16px",
                borderRadius: 6,
                transition: "background-color 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* Contact Form Section */}
      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            boxShadow: "0 10px 38px rgba(0, 100, 22, 0.25)",
            display: "flex",
            maxWidth: 860,
            width: "100%",
            overflow: "hidden",
            flexWrap: "wrap",
            padding: 32,
          }}
        >
          {/* Contact Info */}
          <div
            style={{
              flex: "1 1 300px",
              paddingRight: 32,
              borderRight: "1px solid rgba(34,70,34,0.2)",
            }}
          >
            <h2 style={{ color: "#246324", fontSize: 28, fontWeight: "900", marginBottom: 20 }}>
              Contact Us
            </h2>
            <p style={{ fontSize: 18, color: "#355a27", marginBottom: 16 }}>
              We're here to answer your questions and provide support.
            </p>
            <p style={{ fontSize: 16, marginBottom: 8 }}>
              <strong>Address:</strong> 123 Greenfield Dr, Farmville
            </p>
            <p style={{ fontSize: 16, marginBottom: 8 }}>
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p style={{ fontSize: 16 }}>
              <strong>Email:</strong> jyotsnatalasila@gmail.com
            </p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              flex: "1 1 500px",
              paddingLeft: 32,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                marginBottom: 16,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                outline: "none",
                fontSize: 16,
                fontFamily: "inherit",
                transition: "border-color 0.3s",
              }}
              onFocus={e => (e.target.style.borderColor = "#2e7d32")}
              onBlur={e => (e.target.style.borderColor = "#ccc")}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                marginBottom: 16,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                outline: "none",
                fontSize: 16,
                fontFamily: "inherit",
                transition: "border-color 0.3s",
              }}
              onFocus={e => (e.target.style.borderColor = "#2e7d32")}
              onBlur={e => (e.target.style.borderColor = "#ccc")}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              style={{
                marginBottom: 16,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                outline: "none",
                fontSize: 16,
                fontFamily: "inherit",
                transition: "border-color 0.3s",
              }}
              onFocus={e => (e.target.style.borderColor = "#2e7d32")}
              onBlur={e => (e.target.style.borderColor = "#ccc")}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              style={{
                marginBottom: 24,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                outline: "none",
                fontSize: 16,
                fontFamily: "inherit",
                resize: "vertical",
                transition: "border-color 0.3s",
              }}
              onFocus={e => (e.target.style.borderColor = "#2e7d32")}
              onBlur={e => (e.target.style.borderColor = "#ccc")}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? "#6c757d" : "#2e7d32",
                color: "#fff",
                padding: 14,
                border: "none",
                borderRadius: 8,
                fontSize: 18,
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
                transition: "background-color 0.3s",
                opacity: loading ? 0.7 : 1,
              }}
              onMouseOver={e => {
                if (!loading) e.target.style.backgroundColor = "#246324";
              }}
              onMouseOut={e => {
                if (!loading) e.target.style.backgroundColor = "#2e7d32";
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <p style={{ 
                marginTop: 16, 
                color: status.includes("Failed") ? "#dc3545" : "#2e7d32",
                fontWeight: "bold",
                fontSize: "14px",
                lineHeight: "1.4"
              }}>
                {status}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default Contact;
