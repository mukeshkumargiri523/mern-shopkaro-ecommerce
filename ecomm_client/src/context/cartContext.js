import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      const parseData = JSON.parse(data);
      setCart([...parseData]);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCartContext = () => {
  return useContext(CartContext);
};
export default useCartContext;
