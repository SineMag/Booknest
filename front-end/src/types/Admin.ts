export interface Admin {
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
