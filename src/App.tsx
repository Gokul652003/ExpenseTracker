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

function App() {
  const { loading, session } = useSession();
  console.log(session);

  if (loading) {
    return <div>Loading...</div>;
  }

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return session ? <>{children}</> : <Navigate to="/login" />;
  };

  const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return session ? <Navigate to="/dashboard" /> : <>{children}</>;
  };

  return (
    <Router>
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
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
