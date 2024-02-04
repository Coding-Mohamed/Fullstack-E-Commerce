import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeItemCompletely, clearCart } from "../features/products/ProductSlice";
import { Link } from "react-router-dom";
import "./style/ShoppingCart.css";
import TopSelling from "./TopSelling";
import ModalPage from "./Pages/ModalPage";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.products.cart.items);
  const isLoggedIn = !!localStorage.getItem("token");
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Stringify the cart items before storing them
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]); // This effect runs whenever cartItems changes

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      dispatch({ type: "products/LOAD_SAVED_CART", payload: JSON.parse(savedCartItems) });
    }
  }, [dispatch]);

  const handleClose = () => setShow(false);

  const total = cartItems.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity || 0;
    return acc + itemTotal;
  }, 0);

  const handleAddOne = (item) => {
    dispatch(addToCart({ _id: item._id }));
  };

  const handleRemoveOne = (item) => {
    dispatch(removeFromCart({ _id: item._id }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItemCompletely({ _id: item._id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = async () => {
    const products = cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if not logged in
      return <Link to="/login">Login</Link>;
    }

    try {
      const response = await fetch("https://js2-ecommerce-api.vercel.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        dispatch(clearCart());
        setShow(true); // Show the modal
      } else {
        console.error("Failed to place order");
        // Handle the error, show a message, or redirect the user
      }
    } catch (error) {
      console.error("Error while placing order:", error);
    }
  };

  return (
    <>
      <div className="shopping-cart">
        {cartItems.length === 0 ? (
          <p className="empty">Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <img src={item.images[0]} alt={item.name} style={{ width: "100px", height: "100px" }} />
                <h5>{item.name}</h5>
                <div className="quanty">
                  <p>
                    Quantity: {item.quantity} x ${item.quantity * item.price}
                    <button onClick={() => handleAddOne(item)} className="plus">
                      +
                    </button>
                    <button onClick={() => handleRemoveOne(item)} className="minus">
                      -
                    </button>
                    <button onClick={() => handleRemoveItem(item)} className="delete">
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className="total-order">
            <p>Total: ${total}</p>
            {isLoggedIn ? (
              <button onClick={handlePlaceOrder} className="place-order">
                Place Order
              </button>
            ) : (
              <Link to="/login" className="place-order text-decoration-none text-bg-warning">
                Login to Place Order
              </Link>
            )}
            <button onClick={handleClearCart} className="place-order text-bg-danger clear">
              Clear
            </button>
          </div>
        )}
      </div>
      <TopSelling />
      <ModalPage show={show} handleClose={handleClose} />
    </>
  );
};

export default ShoppingCart;
