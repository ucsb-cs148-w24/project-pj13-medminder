import { Navigate, Outlet} from 'react-router-dom';
import { useAuthContext } from './AuthContext.js';



const ProtectedRoute = ({ fallback }) => {
    return useAuthContext().currentUser ? <Outlet /> : <Navigate to='/'/>;
};

export default ProtectedRoute