import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import TaskCard from "../components/TaskCard";

import TaskForm from "../components/TaskForm";

import SearchBar from "../components/SearchBar";

import API from "../services/api";

import {
  FaTasks,
  FaClipboardList,
} from "react-icons/fa";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] =
  useState("");

  const [editing, setEditing] =
  useState(false);

  const [editId, setEditId] =
  useState(null);

  const [form, setForm] = useState({

    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    due_date: "",

  });

  const getToken = () =>
    localStorage.getItem("token");

  // FETCH TASKS
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

  useEffect(() => {

    fetchTasks();

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
      e.target.value,

    });
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editing) {

        await API.put(

          `/tasks/${editId}`,

          form,

          {
            headers: {
              Authorization:
              `Bearer ${getToken()}`,
            },
          }
        );

        alert("Task Updated");

      } else {

        await API.post(

          "/tasks",

          form,

          {
            headers: {
              Authorization:
              `Bearer ${getToken()}`,
            },
          }
        );

        alert("Task Added");
      }

      fetchTasks();

      setForm({

        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",

      });

      setEditing(false);

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE
  const deleteTask = async (id) => {

    try {

      await API.delete(
        `/tasks/${id}`,
        {
          headers: {
            Authorization:
            `Bearer ${getToken()}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  // EDIT
  const editTask = (task) => {

    setEditing(true);

    setEditId(task.id);

    setForm({

      title: task.title,

      description:
      task.description,

      status:
      task.status,

      priority:
      task.priority,

      due_date:
      task.due_date,

    });
  };

  // FILTER
  const filteredTasks =
  tasks.filter((task) =>

    task.title
    .toLowerCase()
    .includes(
      search.toLowerCase()
    )
  );

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

          {/* HEADER */}
          <div
            className="p-5 rounded-4 shadow-lg mb-5 text-white"
            style={{
              background:
                "rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(12px)",
            }}
          >

            <div className="d-flex align-items-center gap-3">

              <FaTasks size={45} />

              <div>

                <h1 className="fw-bold mb-1">
                  Task Manager
                </h1>

                <p className="mb-0 text-light">
                  Organize and manage
                  your daily tasks
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div
            className="card border-0 shadow-lg rounded-4 p-4 mb-4"
            style={{
              background:
                "rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(10px)",
              color: "white",
            }}
          >

            <h3 className="mb-4">

              {
                editing
                ? "Update Task"
                : "Create New Task"
              }

            </h3>

            <TaskForm
              form={form}
              handleChange={
                handleChange
              }
              handleSubmit={
                handleSubmit
              }
              editing={editing}
            />

          </div>

          {/* SEARCH */}
          <div
            className="card border-0 shadow-lg rounded-4 p-4 mb-4"
            style={{
              background:
                "rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(10px)",
              color: "white",
            }}
          >

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

          </div>

          {/* TASK LIST */}
          <div
            className="card border-0 shadow-lg rounded-4 p-4"
            style={{
              background:
                "rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(10px)",
              color: "white",
            }}
          >

            <div className="d-flex align-items-center gap-2 mb-4">

              <FaClipboardList
                size={28}
              />

              <h3 className="mb-0">
                Your Tasks
              </h3>

            </div>

            {
              filteredTasks.length === 0
              ? (

                <div className="text-center py-5">

                  <h5 className="text-light">
                    No tasks found
                  </h5>

                </div>

              )
              : (

                filteredTasks.map(
                  (task) => (

                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={
                        deleteTask
                      }
                      onEdit={
                        editTask
                      }
                    />

                  )
                )

              )
            }

          </div>

        </div>

      </div>
    </>
  );
}

export default Tasks;