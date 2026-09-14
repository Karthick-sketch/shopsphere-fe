import type { PaymentMethodType } from "../enums/payment-method";
import type { PaymentStatusType } from "../enums/payment-status";

interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: PaymentStatusType;
  method: PaymentMethodType;
  paymentDate: string;
}

export type { Payment };
