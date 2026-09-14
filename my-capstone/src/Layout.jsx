import React from "react";
import './Layout.css';
import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
const Layout = () => {
    return (
        <div className="container">
            <Header />
            <Outlet />
            <Footer />
    `   </div>
    );
};

export default Layout;