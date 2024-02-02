import { createContext, useContext, useState } from 'react';

export const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const updateUserId = (newUserId) => {
    setUserId(newUserId);
  };

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
