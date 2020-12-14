import { createContext, useState } from 'react';

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [navData, setNavData] = useState([]);

  return (
    <LayoutContext.Provider value={{ navData, setNavData }}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };
