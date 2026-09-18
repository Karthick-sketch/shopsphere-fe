import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/order-service";
import type { OrderItemRequest, OrderRequest } from "../models/order";
import "./PaymentPage.css";
import { OrderStatus } from "../enums/order-status";

const SHIPPING_FLAT_RATE = 6.5;
const FREE_SHIPPING_THRESHOLD = 75;

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce(
    (sum, i) => sum + i.productInfo.price * i.quantity,
    0,
  );
  const shipping =
    items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  const digitsOnly = cardNumber.replace(/\D/g, "");
  const formValid =
    name.trim().length > 1 &&
    address.trim().length > 4 &&
    digitsOnly.length === 16 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    cvv.length >= 3;

  if (items.length === 0) {
    return (
      <div className="page payment-empty">
        <h1>Nothing to pay for yet</h1>
        <p>Your cart is empty, so there's no order to place.</p>
        <Link to="/" className="btn btn-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formValid || submitting) return;
    setSubmitting(true);
    setError(null);

    const orderItems: OrderItemRequest[] = items.map((i) => ({
      quantity: i.quantity,
      price: i.productInfo.price,
      productId: i.productInfo.id!,
    }));

    const order: OrderRequest = {
      orderItems,
      subtotal,
      shipping,
      total,
      placedAt: new Date().toISOString(),
      status: OrderStatus.CONFIRMED,
      shippingName: name.trim(),
      shippingAddress: address.trim(),
      cardLast4: digitsOnly.slice(-4),
    };

    try {
      // Simulate a brief authorization delay, this is a mock payment flow —
      // no real card network is contacted.
      await new Promise((resolve) => setTimeout(resolve, 900));
      await createOrder(order);
      clearCart();
      navigate("/orders", { state: { justPlaced: true } });
    } catch {
      setError(
        "The mock payment gateway couldn't confirm this order. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="page payment-page">
      <Link to="/cart" className="payment-page__back">
        ← Back to cart
      </Link>

      <h1 className="payment-page__title">Checkout</h1>
      <p className="payment-page__disclaimer">
        This is a simulated payment form for demo purposes. No real card is
        charged.
      </p>

      <div className="payment-page__layout">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h2 className="payment-form__section-title">Shipping</h2>

          <label className="payment-field">
            <span>Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Ruiz"
              required
            />
          </label>

          <label className="payment-field">
            <span>Shipping address</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Roast St, Brewtown"
              required
            />
          </label>

          <h2 className="payment-form__section-title">Payment</h2>

          <label className="payment-field">
            <span>Card number</span>
            <input
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="4242 4242 4242 4242"
              required
            />
          </label>

          <div className="payment-field-row">
            <label className="payment-field">
              <span>Expiry</span>
              <input
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                required
              />
            </label>

            <label className="payment-field">
              <span>CVV</span>
              <input
                type="text"
                inputMode="numeric"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="123"
                required
              />
            </label>
          </div>

          {error && <p className="payment-form__error">{error}</p>}

          <button
            className="btn btn-primary payment-form__submit"
            disabled={!formValid || submitting}
          >
            {submitting ? "Confirming payment…" : `Pay $${total.toFixed(2)}`}
          </button>
        </form>

        <aside className="payment-summary">
          <h2 className="payment-summary__title">Order summary</h2>
          <ul className="payment-summary__list">
            {items.map((item) => (
              <li key={item.productInfo.id} className="payment-summary__line">
                <img src={item.productInfo.image} alt="" />
                <div>
                  <p className="payment-summary__name">
                    {item.productInfo.name}
                  </p>
                  <p className="payment-summary__meta">
                    {item.quantity} × ${item.productInfo.price.toFixed(2)}
                  </p>
                </div>
                <span className="payment-summary__line-total">
                  ${(item.productInfo.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="payment-summary__totals">
            <div className="payment-summary__row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="payment-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="payment-summary__row payment-summary__row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
