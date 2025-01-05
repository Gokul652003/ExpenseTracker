import { Navigate } from 'react-router-dom';
import { useSession } from './useSession';

export const AuthRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { session } = useSession();

  return session ? <Navigate to="/dashboard" /> : <>{children}</>;
};
