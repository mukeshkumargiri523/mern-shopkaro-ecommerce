import "./CartItem.css";
import { MdClose } from "react-icons/md";
import { useContext } from "react";
import useCartContext from "../../context/cartContext";
import toast from "react-hot-toast";

const CartItem = ({ cart, setCart, removeCartItem }) => {
  function handleQuantityOfItems(incdec, prod) {
    let newValueCart = cart.map((item) => {
      if (item._id === prod._id) {
        if (incdec === "inc") {
          if (item.cartQuantity < 4) {
            item.cartQuantity += 1;

            const data = localStorage.getItem("cart");
            if (data) {
              const parseData = JSON.parse(data);
              let newData = parseData.filter((itm) => itm._id !== item._id);

              localStorage.setItem("cart", JSON.stringify([...newData, item]));
            } else {
              return toast.error("remove product and try again");
            }
          } else {
            toast.error("can't increase more than 4");
          }
        }
        if (incdec === "dec") {
          if (item.cartQuantity > 1) {
            item.cartQuantity -= 1;
            const data = localStorage.getItem("cart");
            if (data) {
              const parseData = JSON.parse(data);
              let newData = parseData.filter((itm) => itm._id !== item._id);
              localStorage.setItem("cart", JSON.stringify([...newData, item]));
            } else {
              return toast.error("remove product and try again");
            }
          } else {
            toast.error("can't reduce further");
          }
        }
        return item;
      } else {
        return item;
      }
    });
    setCart(newValueCart);
  }

  return (
    <div className="cart-products">
      {cart?.map((item) => {
        return (
          <div key={item._id} className="cart-product">
            <div className="img-container">
              <img
                src={`/api/v1/product/product-photo/${item._id}`}
                alt="cart_prod_img"
              />
            </div>
            <div className="prod-details">
              <span className="name">{item.name}</span>
              <MdClose onClick={() => removeCartItem(item._id)} />
              <div className="quantity-buttons">
                <span onClick={() => handleQuantityOfItems("dec", item)}>
                  -
                </span>
                <span className="quantity-no">{item?.cartQuantity}</span>
                <span onClick={() => handleQuantityOfItems("inc", item)}>
                  +
                </span>
              </div>
              <div className="text">
                <span>{item?.cartQuantity}</span>
                <span>x</span>
                <span>{item?.price}</span>=
                <span className="cart-prod-price">
                  $ {+item?.price * +item.cartQuantity}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
