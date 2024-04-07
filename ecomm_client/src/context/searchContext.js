import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    result: [],
  });

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook
const useSearchContext = () => {
  return useContext(SearchContext);
};
export default useSearchContext;
