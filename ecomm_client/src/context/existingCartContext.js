import { useState, useContext, createContext, useEffect } from "react";

const ExistingCartContext = createContext();

export const ExistingCartProvider = ({ children }) => {
  const [newCarts, setNewCarts] = useState([]);

  return (
    <ExistingCartContext.Provider value={{ newCarts, setNewCarts }}>
      {children}
    </ExistingCartContext.Provider>
  );
};

//custom hook
const useExistingCartContext = () => {
  return useContext(ExistingCartContext);
};
export default useExistingCartContext;
