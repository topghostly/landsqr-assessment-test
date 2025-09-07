import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/dashboard-layout";
import AllUserPage from "./pages/all-users-page";
import "./styles/style.scss";
import UserDetails from "./pages/user-details-page";
import ProtectedRoute from "./component/protected-route";
import Auth from "./pages/login";
import { AuthProvider } from "./context/auth";
import AuthLayout from "./layout/auth-layout";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="auth/login" element={<Auth />} />
          </Route>
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<AllUserPage />} />
            <Route path="/user-details/:id" element={<UserDetails />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
