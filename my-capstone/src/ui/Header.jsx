import React from 'react'
import { NavLink } from 'react-router-dom'
import hero from "../assets/modern-restaurant-logo.jpg"
import "./Header.css"
import useCartStore from "../store/useCartStore";
const Header = () => {
    
    const count = useCartStore((state) => state.totalCount());
    const total = useCartStore((state) => state.totalPrice());
    console.log(count);
    console.log(total);
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
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu">Menu</NavLink>
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
