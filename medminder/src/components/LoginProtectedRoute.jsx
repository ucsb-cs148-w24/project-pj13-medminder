import { Routes, Route, Link, Navigate, Outlet, OutletProps} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const ProtectedRoute = ({ }) => {
    const auth = getAuth()
    const user = auth.currentUser
    
    return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute