import { MdDelete, MdLogout, MdEdit, MdAdd } from "react-icons/md";
import { useTaskStore } from "../store/task.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/user.store";


const HomePage = () => {
  const { tasks, getTasks, deleteTask } = useTaskStore() as any;
  const { authUser, checkAuth , logout } = useAuthStore() as any;
  const navigate = useNavigate();


  // Check auth
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch tasks
  useEffect(() => {
    if (authUser?.user?._id) {
      getTasks(authUser.user._id);
    }
  }, [authUser]);

  const handleLogout = () => {
    logout()
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "1.5rem",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0 }}>
          Welcome back {authUser?.user?.name?.charAt(0).toUpperCase() + authUser?.user?.name?.slice(1)} 🙂
        </h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/create-task")}
            style={{
              padding: "8px 14px",
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <MdAdd />
            Create Task
          </button>

          <button
            onClick={() => handleLogout()}
            style={{
              padding: "8px 12px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <MdLogout />
          </button>
        </div>
      </header>

      {/* TASK LIST */}
      <section
        style={{
          background: "#f9fafb",
          padding: "1rem",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>Recent Activity</h3>

        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "10px",
            }}
          >
            {tasks.map((task: any) => (
              <li
                key={task._id}
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                {/* TEXT */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    {task.title}
                  </h4>

                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "13px",
                      color: "#6b7280",
                      lineHeight: "1.4",

                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",

                      wordBreak: "break-word",
                    }}
                    title={task.content}
                  >
                    {task.content}
                  </p>
                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#3b82f6",
                    }}
                  >
                    <MdEdit onClick={() => navigate(`/edit-task/${task._id}`)} size={20} />
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                    }}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default HomePage;