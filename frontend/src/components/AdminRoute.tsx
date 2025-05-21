import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const user = useStore((state) => state.user);
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}