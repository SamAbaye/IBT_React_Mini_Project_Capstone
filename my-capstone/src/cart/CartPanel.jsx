import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import './CartPanel.css'

const Cart = () => {
  const { items, dispatch, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h2>Your Order</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <span>{item.nameEn}</span>
            <button
              onClick={() => dispatch({ type: "decrement", id: item.id })}
            >
              -
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => dispatch({ type: "increment", id: item.id })}
            >
              +
            </button>
            <span>{item.priceETB * item.qty} ETB</span>
            <button className="remove-btn" onClick={() => dispatch({ type: "remove", id: item.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p className="cart-total">
        <strong>Total: {total} ETB</strong>
      </p>

      <button onClick={() => dispatch({type: "clear"})}>Clear Cart</button>

      <Link to="/checkout" className='checkout'>Proceed to Checkout</Link>
      
    </div>
  );
}

export default Cart
