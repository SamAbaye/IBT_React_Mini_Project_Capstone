import React from 'react'
import { NavLink } from 'react-router-dom'
import hero from "../assets/modern-restaurant-logo.jpg"
import "./Header.css"
const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src={hero} alt="logo" />
                <h3>Addis <br/>
                Eats</h3>
            </div>
            <div className="menu">
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
                <li className="count">0 items</li>
                <li className="total-price">$0</li>
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