import { useState, useContext, createContext } from "react";

const bgChangerContext = createContext();

export const BgChangerProvider = ({ children }) => {
  const [bgChanger, setBgChanger] = useState("");

  return (
    <bgChangerContext.Provider value={{ bgChanger, setBgChanger }}>
      {children}
    </bgChangerContext.Provider>
  );
};

//custom hook
const useBgChangerContext = () => {
  return useContext(bgChangerContext);
};
export default useBgChangerContext;
