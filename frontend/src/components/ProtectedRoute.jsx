import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  if (loading) return <div>Загрузка...</div>;
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;