import { sql } from "../utils/database";

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

export interface LoginCredentials {
  emailAddress: string;
  password: string;
}

export const adminTableQuery = () => sql`
  CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    physicalAddress VARCHAR(255) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    profilePicUrl TEXT,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

export const getAdminsQuery = () => sql`
  SELECT * FROM admins;`;

export const getAdminByIdQuery = (id: number) => sql`
  SELECT * FROM admins WHERE id=${id};`;

export const putIntoAdminQuery = (id: number, user: Admin) => sql`
  UPDATE users SET firstName=${user.firstName} , lastName=${user.lastName}, emailAddress=${user.emailAddress}, physicalAddress=${user.physicalAddress}, phoneNumber=${user.phoneNumber}, profilePicUrl=${user.profilePicUrl}, password=${user.password} WHERE id=${id} RETURNING *;`;

export const insertAdminQuery = (user: Admin) => sql`
  INSERT INTO users (firstName, lastName, emailAddress, physicalAddress, phoneNumber, profilePicUrl, password)
  VALUES (${user.firstName}, ${user.lastName}, ${user.emailAddress}, ${user.physicalAddress}, ${user.phoneNumber}, ${user.profilePicUrl}, ${user.password})
  RETURNING *;`;

export const loginAdminQuery = (credentials: LoginCredentials) => sql`
  SELECT * FROM users WHERE emailAddress=${credentials.emailAddress} AND password=${credentials.password} RETURNING *;`;

export const deleteAdminQuery = (id: number) => sql`
  DELETE FROM admins WHERE id=${id} RETURNING *;`;
