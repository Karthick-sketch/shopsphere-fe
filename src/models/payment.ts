import type { PaymentMethodType } from "../enums/payment-method";
import type { PaymentStatusType } from "../enums/payment-status";

interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: PaymentStatusType;
  method: PaymentMethodType;
  initiatedAt: string;
  paidAt: string;
}

interface PaymentRequest {
  orderId: number;
  amount: number;
  method: PaymentMethodType;
  status: PaymentStatusType;
  initiatedAt: string;
}

export type { Payment, PaymentRequest };
