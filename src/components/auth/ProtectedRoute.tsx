import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }:{children:React.ReactNode}) {
  const { user, loading } = useAuth();
  const from=location.pathname
  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" state={from} replace />;
  

  return children;
}
