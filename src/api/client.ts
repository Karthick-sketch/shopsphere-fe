import axios from "axios";

// Base URL points at the mock backend (see /backend in the project root,
// run with `npm start` inside that folder — it serves on port 4000).
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8765";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
