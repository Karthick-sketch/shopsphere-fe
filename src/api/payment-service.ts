import { apiClient } from "./client";
import type { Payment, PaymentRequest } from "../models/payment";

const serviceRoute = "/shopsphere-payment-service/api/payments";

export class PaymentService {
  async pay(payment: PaymentRequest): Promise<Payment> {
    const res = await apiClient.post<Payment>(serviceRoute, payment);
    return res.data;
  }
}
