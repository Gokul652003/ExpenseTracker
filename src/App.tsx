import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { DashBoard } from './dashboard/DashBoard';
import SignIn from './auth/SignIn';
import Login from './auth/Login';
import { Transactions } from './transactions/Transaction';
import NotFound from './auth/NotFound';
import { useSession } from './Routes/useSession';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import { AuthRoute } from './Routes/AuthRoute';
import { ProtectedLayout } from './Routes/ProtectedLayout';
import Profile from './profile/Profile';
import Catagory from './catagory/Catagory';
import { Toaster } from 'sonner'
function App() {
  const { loading } = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Toaster richColors/>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/signin"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <DashBoard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Transactions />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/catagory"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Catagory />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
