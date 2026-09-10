import { apiClient, setBackendStatus } from "./apiClient";
import type { Payment } from "../models/payment";
import type { PaymentMethodType } from "../types/payment-method";
import { initialPayments } from "./mockData";

const localPayments: Payment[] = [...initialPayments];

export interface ProcessPaymentPayload {
  orderId: number;
  amount: number;
  method: PaymentMethodType;
}

export const paymentService = {
  async getPaymentByOrderId(orderId: number): Promise<Payment | undefined> {
    try {
      const response = await apiClient.get<Payment>(`/payment/order/${orderId}`);
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.get<Payment>(`/payments/order/${orderId}`);
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        return localPayments.find((p) => p.orderId === orderId);
      }
    }
  },

  async processPayment(payload: ProcessPaymentPayload): Promise<Payment> {
    try {
      const response = await apiClient.post<Payment>("/payment", payload);
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.post<Payment>("/payments", payload);
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        const newPayment: Payment = {
          id: localPayments.length > 0 ? Math.max(...localPayments.map((p) => p.id)) + 1 : 501,
          orderId: payload.orderId,
          amount: payload.amount,
          status: payload.method === "COD" ? "PENDING" : "PAID",
          method: payload.method,
          paymentDate: new Date().toISOString(),
        };
        localPayments.push(newPayment);
        return newPayment;
      }
    }
  },
};
