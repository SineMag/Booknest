import { sql } from "../database";

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

export interface LoginCredentials {
  emailAddress: string;
  password: string;
}

export const userTableQuery = () => sql`
  CREATE TABLE IF NOT EXISTS users (
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

export const getUsersQuery = () => sql`
  SELECT * FROM users;`;

export const getUserByIdQuery = (id: number) => sql`
  SELECT * FROM users WHERE id=${id};`;

export const putIntoUserQuery = (id: number, user: User) => sql`
  UPDATE users SET firstName=${user.firstName} , lastName=${user.lastName}, emailAddress=${user.emailAddress}, physicalAddress=${user.physicalAddress}, phoneNumber=${user.phoneNumber}, profilePicUrl=${user.profilePicUrl}, password=${user.password} WHERE id=${id};`;

export const insertUserQuery = (user: User) => sql`
  INSERT INTO users (firstName, lastName, emailAddress, physicalAddress, phoneNumber, profilePicUrl, password)
  VALUES (${user.firstName}, ${user.lastName}, ${user.emailAddress}, ${user.physicalAddress}, ${user.phoneNumber}, ${user.profilePicUrl}, ${user.password})
  RETURNING *;`;

export const loginUserQuery = (credentials: LoginCredentials) => sql`
  SELECT * FROM users WHERE emailAddress=${credentials.emailAddress} AND password=${credentials.password};`;
