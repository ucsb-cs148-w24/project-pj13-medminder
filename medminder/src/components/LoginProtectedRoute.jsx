import { Routes, Route, Link, Navigate, Outlet, OutletProps} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { browserLocalPersistence, getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useEffect, useState } from 'react';
import { useAuthContext, useUserId } from './UserIdContext';



const ProtectedRoute = ({ fallback }) => {

    return useAuthContext ? <Outlet /> : <Navigate to='/'/>;
};

export default ProtectedRoute