import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const userLoged = useSelector((state) => state.userLoged);

  if (!userLoged) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user's statut matches
  if (roles && !roles.includes(userLoged.statut)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
