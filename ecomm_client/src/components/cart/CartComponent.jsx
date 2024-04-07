import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import "./CartComponent.css";
import CartItem from "./CartItem.jsx";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCartContext from "../../context/cartContext";
import useAuthContext from "../../context/authContext";
// import { Context } from "../../utils/context";

// import { loadStripe } from "@stripe/stripe-js";
// import { makePaymentRequest } from "../../utils/api";

const CartComponent = ({ setShowCart }) => {
  const { auth } = useAuthContext();
  const { cart, setCart } = useCartContext();
  const [loadEffect, setLoadEffect] = useState(true);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      let parsedItem = JSON.parse(existingCartItem);
      let newCart = parsedItem.map((singItm) => {
        if (auth?.user?.email === singItm?.userId) {
          return singItm;
        }
      });

      for (let i = 0; i < newCart.length; i++) {
        if (newCart.includes(undefined)) {
          let x = newCart.indexOf(undefined);
          newCart.splice(x, 1);
        } else {
          break;
        }
      }

      if (newCart[0] === undefined) {
        setCart([]);
      } else {
        setCart(newCart);
      }
      setLoadEffect(false);
    }
  }, []);
  // const handleCartQuantity = useCallback(() => {
  //   if (!loadEffect) {
  //     if (cart) {
  //       let veryNewCart = cart.map((item) => {
  //         if (!item.hasOwnProperty("cartQuantity")) {
  //           item.cartQuantity = 1;
  //           return item;
  //         } else {
  //           return item;
  //         }
  //       });
  //       return setCart(veryNewCart);
  //     }
  //   }
  // }, [loadEffect, cart]);
  function handleCartQuantity() {
    if (cart) {
      let veryNewCart = cart.map((item) => {
        if (!item.hasOwnProperty("cartQuantity")) {
          item.cartQuantity = 1;
          localStorage.setItem("cart", JSON.stringify(cart));

          return item;
        } else {
          return item;
        }
      });
      setCart(veryNewCart);
    }
  }
  useEffect(() => {
    if (loadEffect === false) {
      handleCartQuantity();
    }
  }, [loadEffect]);

  const totalPrice = () => {
    try {
      const totalAmount = cart.reduce(
        (amount, item) => item.price * item.cartQuantity + amount,
        0
      );
      return totalAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
    }
  };

  //remove Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span>Shopping Cart</span>
          <div className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">Close</span>
          </div>
        </div>
        {!cart?.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No Products in your cart</span>
            <button onClick={() => setShowCart(false)} className="return-shop">
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cart?.length && (
          <>
            <div style={{ overflowY: "scroll" }}>
              <CartItem
                cart={cart}
                setCart={setCart}
                removeCartItem={removeCartItem}
                handleCartQunatity={handleCartQuantity}
              />
            </div>
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">{totalPrice()}</span>
              </div>
              <div className="checkout-cart">
                <Link
                  to="/cart"
                  onClick={() => setShowCart(false)}
                  className="checkout-button"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const CartMemoComponent = React.memo(CartComponent);
