export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  physicalAddress: string;
  phoneNumber: string;
  profilePicUrl?: string;
  password: string;
  createdAt?: Date;
}

export interface IUser {
  id?: number;
  firstname: string;
  lastname: string;
  emailaddress: string;
  physicaladdress: string;
  phonenumber: string;
  profilepicurl?: string;
  password: string;
  createdat?: Date;
}
