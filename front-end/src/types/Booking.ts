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
  roomTypeId: number;
}
