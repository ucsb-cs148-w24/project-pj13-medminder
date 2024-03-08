import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const [currentProfile, setCurrentProfile] = useState(null);
  // could use some implementation of loading state to prevent some weirdness
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setAccessToken(null);
        setCurrentUser(user);
        setLoading(false);
        setCurrentProfile("UserData")
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser, accessToken, setAccessToken, currentProfile, setCurrentProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
};

export function useUserId() {
  const context = useContext(AuthContext);
  if (context == null || context.currentUser == null )
    throw new Error("using userId in null user");
  else
    return context.currentUser.uid;
}

export function useAccessToken() {
  const context = useContext(AuthContext);
  if (context == null || context.accessToken == null )
    throw new Error("using api access token in null user");
  else
    return context.accessToken;
}