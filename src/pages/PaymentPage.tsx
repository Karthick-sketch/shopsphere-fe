import "./PaymentPage.css";
import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../auth/AuthContext";
import OrderService from "../api/order-service";
import UserService from "../api/user-service";
import type { OrderItemRequest, OrderRequest } from "../models/order";
import type { ShippingDetails } from "../models/user";
import { PaymentMethod, type PaymentMethodType } from "../enums/payment-method";
import type { PaymentDetails } from "../models/payment";
import PaymentGatewayService from "../api/payment-gateway-service";
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
  const { items } = useCart();
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(
    PaymentMethod.CARD,
  );
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
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
    shippingDetails?.name?.trim().length > 1 &&
    shippingDetails?.shippingAddress?.trim().length > 4 &&
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formValid || submitting) return;
    setSubmitting(true);
    setError(null);

    const paymentDetails: PaymentDetails = {
      paymentMethod: paymentMethod,
      cardName: cardName.trim(),
      cardNumber: digitsOnly,
      expiryMonth: expiry.slice(0, 2),
      expiryYear: expiry.slice(3),
      cvv,
    };
    const paymentToken =
      await PaymentGatewayService.generatePaymentToken(paymentDetails);

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
      shippingName: shippingDetails?.name?.trim(),
      shippingAddress: shippingDetails?.shippingAddress?.trim(),
      cardLast4: digitsOnly.slice(-4),
      paymentMethod,
      paymentToken,
    };

    try {
      const createdOrder = await OrderService.checkout(order);
      if (createdOrder?.id) {
        setPaymentProcessing(true);
        const status = await OrderService.checkStatus(createdOrder.id);
        if (status === OrderStatus.CONFIRMED) {
          setOrderPlaced(true);
          setTimeout(() => {
            setOrderPlaced(false);
            navigate("/orders");
          }, 2000);
        } else if (status === OrderStatus.PAYMENT_FAILED) {
          setError("Payment failed. Please try again.");
        } else {
          setError("Order placement failed. Please try again.");
        }
      } else {
        setError("Order placement failed. Please try again.");
      }
    } catch (err) {
      setError("Order placement failed. Please try again.");
    } finally {
      setSubmitting(false);
      setPaymentProcessing(false);
    }
  }

  return (
    <div className="page payment-page">
      {paymentProcessing && (
        <div className="payment-processing-overlay" role="status" aria-live="polite">
          <div className="payment-processing-card">
            <div className="processing-spinner-ring">
              <div className="processing-spinner-dot" />
            </div>
            <h2>Processing Payment</h2>
            <p>Please wait while we securely process your payment.</p>
            <div className="processing-dots">
              <span /><span /><span />
            </div>
          </div>
        </div>
      )}

      {orderPlaced && (
        <div className="order-success-overlay" role="status" aria-live="polite">
          <div className="order-success-card">
            <div className="success-confetti">
              <div className="confetti-dot" />
              <div className="confetti-dot" />
              <div className="confetti-dot" />
              <div className="confetti-dot" />
              <div className="confetti-dot" />
              <div className="confetti-dot" />
              <div className="confetti-dot" />
              <div className="confetti-dot" />
            </div>
            <div className="success-icon-wrap">
              <div className="success-icon-circle">
                <svg className="success-check" viewBox="0 0 44 44" aria-hidden="true">
                  <path
                    className="success-check-path"
                    d="M10 23l9 9L34 14"
                  />
                </svg>
              </div>
              <div className="success-icon-orbit" />
            </div>
            <h2>Order Confirmed!</h2>
            <p>Your order has been placed successfully. You'll receive a confirmation shortly.</p>
            <div className="success-redirect-note">Redirecting to your orders…</div>
          </div>
        </div>
      )}

      {!paymentProcessing && !orderPlaced && (
        <>
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
                    setShippingDetails({
                      ...shippingDetails,
                      name: e.target.value,
                    })
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
                    <span>Card Name</span>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jordan Ruiz"
                      required
                    />
                  </label>

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
                        onChange={(e) =>
                          setExpiry(formatExpiry(e.target.value))
                        }
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
                {submitting
                  ? "Confirming payment…"
                  : `Pay $${total.toFixed(2)}`}
              </button>
            </form>

            <aside className="payment-summary">
              <h2 className="payment-summary__title">Order summary</h2>
              <ul className="payment-summary__list">
                {items.map((item) => (
                  <li
                    key={item.productInfo.id}
                    className="payment-summary__line"
                  >
                    <img src={item.productInfo.imageUrl} alt="" />
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
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="payment-summary__row payment-summary__row--total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
