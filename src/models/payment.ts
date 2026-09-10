interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: string;
  method: string;
  paymentDate: string;
}

export type { Payment };
