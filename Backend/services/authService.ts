import { type
  LoginCredentials, type
  User,
  insertUserQuery,
  loginUserQuery,
} from "../models/User";

export const insertIntoUsers = async (user: User) => {
  const result = await insertUserQuery(user);
  return result;
};

export const loginUserDB = async (credentials: LoginCredentials) => {
  const result = await loginUserQuery(credentials);
  return result;
};
