import "./PaymentPage.css";
import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../auth/AuthContext";
import OrderService from "../api/order-service";
import PaymentService from "../api/payment-service";
import UserService from "../api/user-service";
import type { OrderItemRequest, OrderRequest } from "../models/order";
import type { PaymentRequest } from "../models/payment";
import type { ShippingDetails } from "../models/user";
import { OrderStatus } from "../enums/order-status";
import { PaymentMethod, type PaymentMethodType } from "../enums/payment-method";
import { PaymentStatus } from "../enums/payment-status";

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
  const { authUser } = useAuth();

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(
    PaymentMethod.CARD,
  );
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
  const cardValid =
    digitsOnly.length === 16 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    cvv.length >= 3;
  const formValid =
    shippingDetails?.name.trim().length > 1 &&
    shippingDetails?.shippingAddress.trim().length > 4 &&
    (paymentMethod === PaymentMethod.COD || cardValid);

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

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }

    UserService.fetchShippingDetails(authUser.id)
      .then(setShippingDetails)
      .catch((error) => {
        console.error("Failed to fetch shipping details", error);
      });
  }, []);

  function updateOrderStatusAsFailed(orderId: number, order: OrderRequest) {
    setError("Failed to process payment.");
    OrderService.updateOrder(orderId, {
      ...order,
      status: OrderStatus.PAYMENT_FAILED,
    } as OrderRequest);
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
      shippingName: shippingDetails?.name.trim(),
      shippingAddress: shippingDetails?.shippingAddress.trim(),
      cardLast4: digitsOnly.slice(-4),
      authUserId: authUser.id,
    };

    OrderService.createOrder(order)
      .then((ord) => {
        const payment: PaymentRequest = {
          orderId: ord.id,
          amount: total,
          method: paymentMethod,
          status:
            paymentMethod === PaymentMethod.CARD
              ? PaymentStatus.PAID
              : PaymentStatus.PENDING,
          initiatedAt: new Date().toISOString(),
        };
        PaymentService.pay(payment)
          .then((result) => {
            if (result.status === PaymentStatus.FAILED) {
              updateOrderStatusAsFailed(ord.id, order);
            } else {
              clearCart();
            }
          })
          .catch(() => {
            updateOrderStatusAsFailed(ord.id, order);
          })
          .finally(() => {
            setSubmitting(false);
            navigate("/orders");
          });
      })
      .catch(() => {
        setError(
          "The mock payment gateway couldn't confirm this order. Please try again.",
        );
        setSubmitting(false);
      });
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
              value={shippingDetails?.name}
              onChange={(e) =>
                setShippingDetails({ ...shippingDetails, name: e.target.value })
              }
              placeholder="Jordan Ruiz"
              required
            />
          </label>

          <label className="payment-field">
            <span>Phone number</span>
            <input
              type="text"
              value={shippingDetails?.phoneNumber}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  phoneNumber: e.target.value,
                })
              }
              placeholder="9876543210"
              required
            />
          </label>

          <label className="payment-field">
            <span>Shipping address</span>
            <input
              type="text"
              value={shippingDetails?.shippingAddress}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  shippingAddress: e.target.value,
                })
              }
              placeholder="123 Roast St, Brewtown"
              required
            />
          </label>

          <h2 className="payment-form__section-title">Payment</h2>

          <div className="payment-method">
            <span className="payment-method__label">Payment method</span>
            <div className="payment-method__options">
              <label
                className={`payment-method__option${
                  paymentMethod === PaymentMethod.CARD
                    ? " payment-method__option--active"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={PaymentMethod.CARD}
                  checked={paymentMethod === PaymentMethod.CARD}
                  onChange={() => setPaymentMethod(PaymentMethod.CARD)}
                />
                <span className="payment-method__icon">💳</span>
                <span>Credit / Debit Card</span>
              </label>
              <label
                className={`payment-method__option${
                  paymentMethod === PaymentMethod.COD
                    ? " payment-method__option--active"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={PaymentMethod.COD}
                  checked={paymentMethod === PaymentMethod.COD}
                  onChange={() => setPaymentMethod(PaymentMethod.COD)}
                />
                <span className="payment-method__icon">🏠</span>
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          {paymentMethod === PaymentMethod.CARD && (
            <div>
              <label className="payment-field">
                <span>Card number</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
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
            </div>
          )}

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
