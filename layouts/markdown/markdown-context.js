import { createContext, useState } from 'react';

const MarkdownContext = createContext();

const MarkdownLayoutProvider = ({ children }) => {
  const [navData, setNavData] = useState([]);

  return (
    <MarkdownContext.Provider value={{ navData, setNavData }}>
      {children}
    </MarkdownContext.Provider>
  );
};

export { MarkdownContext, MarkdownLayoutProvider };
