import type { PaymentDetails } from "../models/payment";

export default class PaymentGatewayService {
  static async generatePaymentToken(
    // @ts-ignore
    paymentDetails: PaymentDetails,
  ): Promise<string> {
    const token = `pm_${Math.random().toString(36).substring(2)}`;
    return Promise.resolve(token);
  }
}
