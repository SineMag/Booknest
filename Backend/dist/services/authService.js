import { LoginCredentials, User, insertUserQuery, loginUserQuery, } from "../models/User";
export const insertIntoUsers = async (user) => {
    const result = await insertUserQuery(user);
    return result;
};
export const loginUserDB = async (credentials) => {
    const result = await loginUserQuery(credentials);
    return result;
};
//# sourceMappingURL=authService.js.map