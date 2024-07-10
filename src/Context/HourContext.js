import React, { createContext, useState, useContext } from 'react';

// Tạo context
const HourContext = createContext();

// Tạo provider component
export const HourProvider = ({ children }) => {
  const [hour, setHour] = useState(null);

  return (
    <HourContext.Provider value={{ hour, setHour }}>
      {children}
    </HourContext.Provider>
  );
};

// Custom hook để sử dụng context dễ dàng hơn
export const useHour = () => {
  return useContext(HourContext);
};
