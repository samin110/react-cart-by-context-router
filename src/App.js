import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import CartProvider from "./Context/CartProvider";
import Profile from "./Components/Profile";
import AuthProvider from "./Context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <CartProvider>
          <div className='App'>
            <Routes>
              <Route
                path='/'
                element={<HomePage />}
              />
              <Route
                path='/profile'
                element={<Profile />}
              />
              <Route
                path='/cart'
                element={<CartPage />}
              />
              <Route
                path='/checkout'
                element={<CheckoutPage />}
              />
              <Route
                path='/login'
                element={<LoginPage />}
              />
              <Route
                path='/signup'
                element={<SignupPage />}
              />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
