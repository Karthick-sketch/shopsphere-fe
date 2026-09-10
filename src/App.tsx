import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import InventoryPage from "./pages/InventoryPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import CartPage from "./pages/CartPage";
import PaymentsPage from "./pages/PaymentsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"           element={<Dashboard />} />
        <Route path="/users"      element={<UsersPage />} />
        <Route path="/products"   element={<ProductsPage />} />
        <Route path="/inventory"  element={<InventoryPage />} />
        <Route path="/orders"     element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/cart"       element={<CartPage />} />
        <Route path="/payments"   element={<PaymentsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
