// App.jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import DishDetail from "./menu/DishDetail";
import Header from "./ui/Header";
import ProtectedRoute from "./auth/ProtectedRoute";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ErrorBoundary from "./ErrorBoundary";

const Home = lazy(() => import("./ui/Home"));
const Menu = lazy(() => import("./menu/Menu"));
const CartPanel = lazy(() => import("./cart/CartPanel"));
const Checkout = lazy(() => import("./checkout/Checkout"));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
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
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
