export const PaymentMethod = {
  COD: "COD",
  CARD: "CARD",
} as const;

export type PaymentMethodType =
  (typeof PaymentMethod)[keyof typeof PaymentMethod];
