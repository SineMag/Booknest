import { User, getUsersQuery } from "../models/User";
import { sql } from "../database";
import { log } from "node:console";

export const selectAllUsers = async () => {
  const users = await getUsersQuery();
  log(101);
  return users;
};
