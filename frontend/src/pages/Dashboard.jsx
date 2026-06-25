import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

import {
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

function Dashboard() {

  const name = localStorage.getItem("name");

  const [tasks, setTasks] = useState([]);

  const getToken = () =>
    localStorage.getItem("token");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get(
        "/tasks",
        {
          headers: {
            Authorization:
            `Bearer ${getToken()}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const totalTasks = tasks.length;

  const pendingTasks =
    tasks.filter(
      (task) =>
      task.status === "Pending"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) =>
      task.status === "Completed"
    ).length;

  return (

    <>
      <Navbar />

      <div
        className="container-fluid min-vh-100 py-5"
        style={{
          background:
            "linear-gradient(to right, #0f172a, #1e293b)",
        }}
      >

        <div className="container">

          {/* HERO */}
          <div
            className="p-5 rounded-4 mb-5 text-white shadow-lg"
            style={{
              background:
                "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >

            <h1 className="display-5 fw-bold">
              Welcome back, {name} 👋
            </h1>

            <p className="lead mt-3">
              Manage your daily tasks
              efficiently.
            </p>

            <Link
              to="/tasks"
              className="btn btn-primary btn-lg mt-3"
            >
              Manage Tasks
              <FaArrowRight className="ms-2" />
            </Link>

          </div>

          {/* STATS */}
          <div className="row g-4">

            {/* TOTAL */}
            <div className="col-md-4">

              <div
                className="card border-0 shadow-lg rounded-4 h-100"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "white",
                }}
              >

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between">

                    <div>

                      <h5>Total Tasks</h5>

                      <h1>
                        {totalTasks}
                      </h1>

                    </div>

                    <FaTasks size={45} />

                  </div>

                </div>

              </div>

            </div>

            {/* PENDING */}
            <div className="col-md-4">

              <div
                className="card border-0 shadow-lg rounded-4 h-100"
                style={{
                  background:
                    "linear-gradient(135deg,#f59e0b,#d97706)",
                  color: "white",
                }}
              >

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between">

                    <div>

                      <h5>Pending</h5>

                      <h1>
                        {pendingTasks}
                      </h1>

                    </div>

                    <FaClock size={45} />

                  </div>

                </div>

              </div>

            </div>

            {/* COMPLETED */}
            <div className="col-md-4">

              <div
                className="card border-0 shadow-lg rounded-4 h-100"
                style={{
                  background:
                    "linear-gradient(135deg,#10b981,#059669)",
                  color: "white",
                }}
              >

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between">

                    <div>

                      <h5>Completed</h5>

                      <h1>
                        {completedTasks}
                      </h1>

                    </div>

                    <FaCheckCircle size={45} />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;