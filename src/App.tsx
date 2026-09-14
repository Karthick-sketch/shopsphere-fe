import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProductsGrid } from "./pages/ProductsGrid";
import { ProductDetails } from "./pages/ProductDetails";
import { CartPage } from "./pages/CartPage";
import { PaymentPage } from "./pages/PaymentPage";
import { OrdersPage } from "./pages/OrdersPage";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<ProductsGrid />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
