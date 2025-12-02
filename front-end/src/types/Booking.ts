export interface Booking {
  id?: string;
  checkindate: string;
  checkoutdate: string;
  numberofguests: number;
  totalprice: string;
  specialrequest?: string;
  status: string;
  userid: number;
  accommodationid: number;
  roomtypeid?: number;
}
