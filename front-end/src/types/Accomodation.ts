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
}

export interface IAccomodation {
  name: string;
  description: string;
  imageGallery: string[];
  amenities: string[];
  roomTypes: string[];
  physicalAddress: string;
  phoneNumber: string;
  emailAddress: string;
  rating: number;
}
