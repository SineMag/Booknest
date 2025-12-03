export interface Booking {
  id?: string;
  checkindate: Date;
  checkoutdate: Date;
  numberofguests: number;
  totalprice: number;
  specialrequest?: string;
  status: string;
  userid: number;
  accommodationid: number;
  roomType: string;
}

export interface IBooking {
  id?: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  totalPrice: number;
  specialRequest?: string;
  status: string;
  userId: number;
  accommodationId: number;
  roomType: string;
}
