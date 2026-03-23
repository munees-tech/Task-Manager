import LoginPage from "./pages/LoginPage";
import SignUPPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreateTaskPage from "./pages/CreateTaskPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/user.store";
import { useEffect } from "react";
import EditTaskPage from "./pages/EditTaskPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore() as any;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUPPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/create-task"
          element={authUser ? <CreateTaskPage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/edit-task/:id"
          element={authUser ? <EditTaskPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
