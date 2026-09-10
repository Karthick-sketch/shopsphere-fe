import type { Product } from "../models/product";
import type { Inventory } from "../models/inventory";
import type { User } from "../models/user";
import type { Cart, CartItem } from "../models/cart";
import type { Order, OrderItem } from "../models/order";
import type { Payment } from "../models/payment";

export const initialUsers: User[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@shopsphere.com",
    password: "password123",
    role: "USER",
  },
  {
    id: 2,
    name: "Admin Manager",
    email: "admin@shopsphere.com",
    password: "adminpassword",
    role: "ADMIN",
  },
];

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    description: "Over-ear bluetooth headphones with active noise cancellation, 30-hour battery life, and high-fidelity sound.",
    price: 3499,
    sku: "ELEC-HD-001",
    category: "Electronics",
    userId: 2,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Heart rate monitor, sleep tracking, step counter, waterproof design with 1.4-inch AMOLED display.",
    price: 2199,
    sku: "ELEC-SW-002",
    category: "Electronics",
    userId: 2,
  },
  {
    id: 3,
    name: "Classic Cotton Oxford Shirt",
    description: "100% breathable pure cotton long-sleeve casual button-down shirt. Regular fit, pre-washed for softness.",
    price: 899,
    sku: "CLOTH-SH-101",
    category: "Clothing",
    userId: 2,
  },
  {
    id: 4,
    name: "Slim Fit Denim Jeans",
    description: "Durable stretch denim with 5-pocket styling. Comfortable mid-rise everyday wear.",
    price: 1299,
    sku: "CLOTH-JN-102",
    category: "Clothing",
    userId: 2,
  },
  {
    id: 5,
    name: "Lightweight Running Sneakers",
    description: "Breathable mesh upper with cushioned EVA sole for running, walking, and gym workouts.",
    price: 1899,
    sku: "FOOT-SN-201",
    category: "Footwear",
    userId: 2,
  },
  {
    id: 6,
    name: "Stainless Steel Thermal Water Bottle (750ml)",
    description: "Double-wall vacuum insulated flask that keeps drinks cold for 24 hours or hot for 12 hours. BPA free.",
    price: 499,
    sku: "HOME-WB-301",
    category: "Home & Kitchen",
    userId: 2,
  },
  {
    id: 7,
    name: "Ceramic Non-Stick Frying Pan (28cm)",
    description: "Induction and gas friendly cookware with heat-resistant ergonomic wooden handle and scratch-resistant coating.",
    price: 1149,
    sku: "HOME-PAN-302",
    category: "Home & Kitchen",
    userId: 2,
  },
  {
    id: 8,
    name: "Ergonomic Memory Foam Pillow",
    description: "Contour cervical orthopedic pillow for neck support and comfortable deep sleep. Includes washable cover.",
    price: 799,
    sku: "HOME-PL-303",
    category: "Home & Kitchen",
    userId: 2,
  },
  {
    id: 9,
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description: "Essential guide by Robert C. Martin on software development, writing readable, maintainable, and robust code.",
    price: 650,
    sku: "BOOK-CC-401",
    category: "Books",
    userId: 2,
  },
  {
    id: 10,
    name: "Compact USB-C Fast Charger 65W",
    description: "GaN technology fast charging adapter compatible with laptops, phones, and tablets. Foldable prongs.",
    price: 1299,
    sku: "ELEC-CH-003",
    category: "Electronics",
    userId: 2,
  },
];

export const initialInventories: Inventory[] = [
  { id: 1, productId: 1, quantity: 24 },
  { id: 2, productId: 2, quantity: 15 },
  { id: 3, productId: 3, quantity: 40 },
  { id: 4, productId: 4, quantity: 18 },
  { id: 5, productId: 5, quantity: 8 },
  { id: 6, productId: 6, quantity: 50 },
  { id: 7, productId: 7, quantity: 12 },
  { id: 8, productId: 8, quantity: 0 }, // Out of stock example
  { id: 9, productId: 9, quantity: 30 },
  { id: 10, productId: 10, quantity: 19 },
];

export const initialCarts: Cart[] = [
  { id: 1, userId: 1 },
];

export const initialCartItems: CartItem[] = [
  { id: 1, cartId: 1, productId: 1, quantity: 1 },
  { id: 2, cartId: 1, productId: 6, quantity: 2 },
];

export const initialOrders: Order[] = [
  {
    id: 1001,
    userId: 1,
    totalAmount: 2199,
    status: "DELIVERED",
    orderDate: "2026-09-02T10:30:00Z",
  },
  {
    id: 1002,
    userId: 1,
    totalAmount: 1548,
    status: "SHIPPED",
    orderDate: "2026-09-08T14:15:00Z",
  },
];

export const initialOrderItems: OrderItem[] = [
  {
    id: 1,
    orderId: 1001,
    productId: 2,
    quantity: 1,
    unitPrice: 2199,
  },
  {
    id: 2,
    orderId: 1002,
    productId: 3,
    quantity: 1,
    unitPrice: 899,
  },
  {
    id: 3,
    orderId: 1002,
    productId: 9,
    quantity: 1,
    unitPrice: 649,
  },
];

export const initialPayments: Payment[] = [
  {
    id: 501,
    orderId: 1001,
    amount: 2199,
    status: "PAID",
    method: "CARD",
    paymentDate: "2026-09-02T10:32:00Z",
  },
  {
    id: 502,
    orderId: 1002,
    amount: 1548,
    status: "PAID",
    method: "UPI",
    paymentDate: "2026-09-08T14:16:00Z",
  },
];
