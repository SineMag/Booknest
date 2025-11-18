import { sql } from "../database";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  physicalAddress: string;
  phoneNumber: string;
  profilePicUrl: string;
  password: string;
  createdAt?: Date;
}

export const userTableQuery = () => sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    physicalAddress VARCHAR(255) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    profilePicUrl TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

export const getUsersQuery = () => sql`
  SELECT * FROM users;`;
