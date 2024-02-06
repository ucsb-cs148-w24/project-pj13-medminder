import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

export const UserIdContext = createContext();
const AuthContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  // could use some implementation of loading state to prevent some weirdness
  const auth = getAuth()

  const updateUserId = (newUserId) => {
    setUserId(newUserId);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <UserIdContext.Provider value={{ userId, updateUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error('useUserId must be used within a UserIdProvider');
  }
  return context;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a UserIdProvider');
  }
  return context;
}