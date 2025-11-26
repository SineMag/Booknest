declare module "@paystack/inline-js" {
  export default class PaystackPop {
    constructor();
    newTransaction(options: any): any;
    resumeTransaction(accessCode: string): any;
  }
}
