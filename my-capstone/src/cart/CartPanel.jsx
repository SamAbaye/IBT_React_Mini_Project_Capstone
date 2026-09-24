import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import "./CartPanel.css";

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeCartItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Order</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <span>{item.nameEn}</span>
            <button onClick={() => decrementItem(item.id)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => incrementItem(item)}>+</button>
            <span>{item.priceETB * item.qty} ETB</span>
            <button className="remove-btn" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p className="cart-total">
        <strong>Total: {total} ETB</strong>
      </p>

      <button onClick={clearCart}>Clear Cart</button>

      <Link to="/checkout" className="checkout">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;
