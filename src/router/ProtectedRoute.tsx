import { Navigate, useParams } from 'react-router-dom';

const ADMIN_SECRET = 'xK9q2';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { secret } = useParams();

  if (secret !== ADMIN_SECRET) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}