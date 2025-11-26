declare global {
  interface Window {
    PaystackPop: {
      new (...args: any[]): any;
      prototype: any;
    };
  }
}

export {};
