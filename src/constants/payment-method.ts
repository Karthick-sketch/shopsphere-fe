const PaymentMethod = {
  COD: "COD",
  UPI: "UPI",
  CARD: "CARD",
} as const;

export type PaymentMethodType =
  (typeof PaymentMethod)[keyof typeof PaymentMethod];
