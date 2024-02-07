import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // could use some implementation of loading state to prevent some weirdness
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        console.log("authatuh");
        setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
};