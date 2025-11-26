export interface ITransaction {
  amount: number;
  email: string;
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
}

export class PayStack {
  API_URL = "https://api.paystack.co/";
  SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  async initialiseTransaction(data: ITransaction) {
    const response = await fetch(this.API_URL + "transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }

  async verifyTransaction(reference: string) {
    const response = await fetch(
      this.API_URL + "transaction/verify/" + reference,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result;
  }
}
