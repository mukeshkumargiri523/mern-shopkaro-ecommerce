import { useState, useContext, createContext, useEffect } from "react";

const VisitedProductContext = createContext();

export const VisitedProductProvider = ({ children }) => {
  const [visitedProduct, setVisitedProduct] = useState([]);

  return (
    <VisitedProductContext.Provider
      value={{ visitedProduct, setVisitedProduct }}
    >
      {children}
    </VisitedProductContext.Provider>
  );
};

//custom hook
const useVisitedProductContext = () => {
  return useContext(VisitedProductContext);
};
export default useVisitedProductContext;
