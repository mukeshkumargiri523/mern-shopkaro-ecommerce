import { useState, useContext, createContext } from "react";

const mobileViewContext = createContext();

export const MobileViewProvider = ({ children }) => {
  const [mobileView, setMobileView] = useState();

  return (
    <mobileViewContext.Provider value={{ mobileView, setMobileView }}>
      {children}
    </mobileViewContext.Provider>
  );
};

//custom hook
const useMobileViewContext = () => {
  return useContext(mobileViewContext);
};
export default useMobileViewContext;
