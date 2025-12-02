import { Routes, Route, NavLink } from "react-router-dom";
import ShopPage from "./pages/ShopPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { useShop } from "./state/ShopContext.jsx";
import { useAuth } from "./state/AuthContext.jsx";

export default function App() {
  const { cart } = useShop();
  const { user, logout } = useAuth();

  const navClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-brand">
          <div className="app-header-logo">S</div>
          <div className="app-header-title">
            <span className="app-header-title-main">SmartShop</span>
            <span className="app-header-title-sub">Order Portal</span>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/" end className={navClass}>
            Shops
          </NavLink>
          <NavLink to="/orders" className={navClass}>
            Orders
          </NavLink>
        </nav>

        <CartDrawer />

        <div style={{ marginLeft: 16 }} className="user-badge">
          {user ? (
            <>
              <div>
                Logged in as{" "}
                <span className="user-badge-name">{user.name}</span>
              </div>
              <button
                className="btn-outline"
                style={{ marginTop: 4 }}
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn-outline">
              Login
            </NavLink>
          )}
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ShopPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span>Cart items: {cart.items.length}</span>
      </footer>
    </div>
  );
}
