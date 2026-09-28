import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/shopsphere-auth-service": {
        target: "http://localhost:8765",
        changeOrigin: true,
        secure: false,
      },
      "/shopsphere-user-service": {
        target: "http://localhost:8765",
        changeOrigin: true,
        secure: false,
      },
      "/shopsphere-product-service": {
        target: "http://localhost:8765",
        changeOrigin: true,
        secure: false,
      },
      "/shopsphere-cart-service": {
        target: "http://localhost:8765",
        changeOrigin: true,
        secure: false,
      },
      "/shopsphere-order-service": {
        target: "http://localhost:8765",
        changeOrigin: true,
        secure: false,
      },
      "/shopsphere-payment-service": {
        target: "http://localhost:8765",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
