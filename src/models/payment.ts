import type { PaymentMethodType } from "../types/payment-method";
import type { PaymentStatusType } from "../types/payment-status";

interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: PaymentStatusType;
  method: PaymentMethodType;
  paymentDate: string;
}

export type { Payment };
