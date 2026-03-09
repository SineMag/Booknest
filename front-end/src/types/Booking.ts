export interface IBooking {
  id?: string;
  checkindate: Date;
  checkoutdate: Date;
  numberofguests: number;
  totalprice: number;
  specialrequest?: string;
  status: string;
  userid: number;
  accommodationid: number;
  roomtype: string;
}

export interface Booking {
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
