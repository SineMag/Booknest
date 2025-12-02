export interface Accomodation {
  id?: number;
  name: string;
  description: string;
  imagegallery: string[];
  amenities: string[];
  physicaladdress: string;
  phonenumber: string;
  emailaddress: string;
  roomtypes: string[];
  rating: number;
  pricepernight: number;
}
