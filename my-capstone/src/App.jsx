// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Menu from "./menu/Menu";
import CartPanel from "./cart/CartPanel";
import Checkout from "./checkout/Checkout";
import AuthProvider from "./auth/AuthProvider";
import DishCard from "./menu/DishCard";
import Home from "./ui/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<DishCard />} />
          <Route path="featured" element={<Menu />} />
          <Route path="cart" element={<CartPanel />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<AuthProvider />} />
          <Route path="*" element={<Menu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
