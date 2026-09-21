// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Menu from "./menu/Menu";
import CartPanel from "./cart/CartPanel";
import { CartProvider } from "./cart/CartProvider";
import Checkout from "./checkout/Checkout";
import { AuthProvider } from "./auth/AuthProvider"; // named import — matches `export function AuthProvider`
import ProtectedRoute from "./auth/ProtectedRoute";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import DishDetail from "../src/menu/DishDetail";
import Home from "./ui/Home";
import Header from "./ui/Header";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="cart" element={<CartPanel />} />
              <Route
                path="checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="*" element={<Menu />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
