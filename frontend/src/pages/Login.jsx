import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaTasks,
} from "react-icons/fa";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    email: "",
    password: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
      e.target.value,

    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  };

  return (

    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(to right, #0f172a, #1e293b)",
      }}
    >

      <div
        className="card border-0 shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "25px",
          background:
            "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          color: "white",
        }}
      >

        {/* LOGO */}
        <div className="text-center mb-4">

          <div
            className="d-inline-flex justify-content-center align-items-center rounded-circle mb-3"
            style={{
              width: "80px",
              height: "80px",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
            }}
          >

            <FaTasks size={35} />

          </div>

          <h2 className="fw-bold">
            Welcome Back
          </h2>

          <p className="text-light">
            Login to continue managing
            your tasks
          </p>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <div className="input-group">

              <span className="input-group-text bg-dark text-white border-0">
                <FaEnvelope />
              </span>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="form-control bg-dark text-white border-0"
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <span className="input-group-text bg-dark text-white border-0">
                <FaLock />
              </span>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="form-control bg-dark text-white border-0"
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            className="btn btn-primary w-100 py-2 fw-bold"
            style={{
              borderRadius: "12px",
            }}
          >
            Login
          </button>

        </form>

        {/* REGISTER */}
        <p className="mt-4 text-center text-light">

          Don't have an account?

          <Link
            to="/register"
            className="ms-2 text-info text-decoration-none fw-bold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;