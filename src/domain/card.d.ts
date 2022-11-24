interface IPaymentCard {
  id: string;
  brand: string;
  customer: string;
  exp_year: number;
  exp_month: number;
  last4: string;
  fingerprint: string;
}
