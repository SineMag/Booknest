import { User, getUsersQuery } from "../models/User";
import { sql } from "../database";
import { log } from "node:console";

export const selectAllUsers = async () => {
  const users = await getUsersQuery();
  return users;
};

export const putIntoUser = async (id: number, user: User) => {
  const { firstName, lastName, emailAddress, physicalAddress, phoneNumber } =
    user;
  const result = await sql`
    UPDATE users
    SET first_name = ${firstName}, last_name = ${lastName}, email_address = ${emailAddress}, physical_address = ${physicalAddress}, phone_number = ${phoneNumber}
    WHERE id = ${id}
    RETURNING *;
  `;
  return result;
};
