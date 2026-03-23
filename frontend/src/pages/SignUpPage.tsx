import { useState } from "react";
import { useAuthStore } from "../store/user.store";
import {useNavigate} from "react-router-dom"

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const { signup } = useAuthStore() as any;

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     const success = await signup(formData);

    if(success) {
      navigate("/")
    }
  };

  return (
    <div
      className="page-container"
      style={{
        maxWidth: "480px",
        margin: "2rem auto",
        padding: "1.6rem",
        border: "1px solid #ddd",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
        Create Account
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <label style={{ display: "grid", gap: 4 }}>
          Full Name
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="Your name"
            style={{
              width: "100%",
              padding: "0.7rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          Email
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "0.7rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          Password
          <input
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            type="password"
            placeholder="Create password"
            style={{
              width: "100%",
              padding: "0.7rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#10b981",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center", color: "#555" }}>
        Already registered? <a href="/login">Login above</a>
      </p>
    </div>
  );
};

export default SignUpPage;
