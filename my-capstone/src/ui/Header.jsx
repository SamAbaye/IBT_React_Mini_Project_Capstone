import React from 'react'
import { NavLink } from 'react-router-dom'
import hero from "../assets/modern-restaurant-logo.jpg"
import "./Header.css"
import { useCart } from '../cart/CartContext' // useCart, not useContext(CartContext) directly —
                                                 // this is the guarded hook we built that throws
                                                 // a clear error if Header ever renders outside <CartProvider>

const Header = () => {
    // count and total are already computed for you inside CartProvider's useMemo —
    // no need to derive them again here from `items`
    const { count, total } = useCart();

    return (
        <div className="header">
            <div className="logo">
                <img src={hero} alt="logo" />
                <h3>Addis <br/>
                Eats</h3>
            </div>
            <div className="nav-menu">
                <ul className="menu-list">
                    <li>
                        <NavLink to="/menu">Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/featured">Featured Dish</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">Order & Cart</NavLink>
                    </li>
                    <li>
                        <NavLink to="/checkout">Delivery & Checkout</NavLink>
                    </li>
                </ul>
            </div>

            <ul className="cart-items">
                {/* count = total quantity across all items (not items.length) */}
                <li className="count">{count} items</li>
                {/* total = sum of priceETB * qty across all items */}
                <li className="total-price">${total}</li>
            </ul>

            <ul className="auth">
                <li className="login">
                    <NavLink to="/login"> Login </NavLink>
                </li>
                <li className="signup">
                    <NavLink to="/signup">Signup</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Header
